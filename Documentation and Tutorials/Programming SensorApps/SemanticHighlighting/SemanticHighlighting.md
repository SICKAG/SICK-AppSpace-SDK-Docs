# Semantic Highlighting

## About this tutorial

The goal of this article is to help you to customize the semantic highlighting in your VS Code editor.

## What is Semantic Highlighting?

Semantic Highlighting allows our Lua language server to provide additional visual information based on the language servers knowledge on symbols in the context of your project. 
It allows developers to quickly identify and differentiate between parts of the code improving readability and reducing errors.

## Customizing Semantic Highlighting

The highlighting in VS Code can generally be modified by customizing syntax styling and coloring in the user settings.
To apply your own styling, open the user settings (Open Command Palette > _Preferences: Open User Settings (JSON)_).

![image](https://github.com/user-attachments/assets/0cc7cea8-dae2-4fbb-a09c-310c09f239b0)

There, you can define your own styling rules. The general scheme looks like this:

```yaml
"editor.semanticTokenColorCustomizations": {
        "rules": {
            <tokenType>: {
                "foreground": "#f4d03f",
                "fontStyle": "bold underline"
            },
            <tokenType>.<tokenModifier>: {
                "foreground": "#cb4335",
                "fontStyle": "italic"
            }
        }
    }
```
The example above shows how to customize the color ("foreground") and styling ("fontStyle") for a tokenType (and tokenModifier) of your choice. 
A complete list of all standard token types and modifiers to customize can be found [here](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#standard-token-types-and-modifiers).

## CROWN Tokens and Modifiers

Since SICK AppSpace SDK v1.4.0, users can define their own styling for CROWN functions and events. To achieve this, we introduced two new token types and four new token modifiers.
**CROWN Token Types**
- crownFunction
- crownEvent

**CROWN Token Modifiers**
- released
- experimental
- deprecated
- hidden

To customize the appearance of your usages of CROWN functions and events, you can customize the visuals similarily to this example:

```yaml
"editor.semanticTokenColorCustomizations": {
        "rules": {
            "crownFunction.released": {
                "foreground": "#44ff00",
                "fontStyle": "bold underline"
            },
            "crownFunction.experimental": {
                "foreground": "#ff0000",
                "fontStyle": "italic"
            }
        }
    }
```
![image](https://github.com/user-attachments/assets/09b2b523-be1f-43a1-b48e-5945424d76a0)



