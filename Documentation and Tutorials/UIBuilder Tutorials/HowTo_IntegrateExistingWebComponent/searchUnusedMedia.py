import os, sys, re

files = os.listdir('./media')
if (len(files) == 0):
    print('No media found')
    sys.exit(0)

adocName = [x for x in os.listdir('.') if x.find('.adoc') > -1][0]
if (adocName == "" or not adocName):
    print('No adoc found')
    sys.exit(0)

adocText = ""
with open(adocName, 'r') as adocFile:
    adocText = adocFile.read()

filesNotFound = []
for file in files:
    m = re.search(file, adocText)
    if not m:
        filesNotFound.append(file)

if len(filesNotFound) == 0:
    print ("All files found")
    sys.exit(0)

rem = input(f"Found that following files have no reference in the {adocName} document: {', '.join(filesNotFound)}. Do you want to remove (y/n)?")

if rem == "y":
    for file in filesNotFound:
        os.system('git rm -f ./media/'+file)
        