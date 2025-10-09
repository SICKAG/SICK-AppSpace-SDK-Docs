#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to extract VS Code extension commands that are available in the command palette
 * Usage: node extract-commands.js [path-to-package.json]
 */

function extractCommands(packageJsonPath) {
    try {
        // Read and parse package.json
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        if (!packageJson.contributes) {
            console.error('No contributes section found in package.json');
            return;
        }

        const commands = packageJson.contributes.commands || [];
        const commandPaletteMenu = packageJson.contributes.menus?.commandPalette || [];
        
        // Create a map of commands excluded from command palette (when: false)
        const includedCommands = new Set();
        commandPaletteMenu.forEach(menuItem => {
            if (menuItem.when !== 'false' && menuItem.when !== false) {
                includedCommands.add(menuItem.command);
            }
        });

        // Filter and format commands
        const availableCommands = commands
            .filter(command => includedCommands.has(command.command))
            .map(command => ({
                category: command.category || 'General',
                title: command.title,
                command: command.command
            }))
            .sort((a, b) => {
                // Sort by category first, then by title
                if (a.category !== b.category) {
                    return a.category.localeCompare(b.category);
                }
                return a.title.localeCompare(b.title);
            });

        // Output formatted commands
        console.log('Available Commands in Command Palette:');
        console.log('=====================================');
        availableCommands.forEach(cmd => {
            console.log(`${cmd.category}: ${cmd.title}`);
        });

        console.log(`\nTotal: ${availableCommands.length} commands available in command palette`);
        console.log(`Excluded: ${commands.length - availableCommands.length} commands hidden from command palette`);
        

    } catch (error) {
        console.error('Error processing package.json:', error.message);
        process.exit(1);
    }
}

// Get package.json path from command line argument or use default
const packageJsonPath = process.argv[2] || './package.json';

// Check if file exists
if (!fs.existsSync(packageJsonPath)) {
    console.error(`File not found: ${packageJsonPath}`);
    console.log('Usage: node extract-commands.js [path-to-package.json]');
    process.exit(1);
}

// Extract and display commands
extractCommands(packageJsonPath);