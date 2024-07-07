// scripts.js

document.getElementById('itemAddonBtn').addEventListener('click', function() {
    document.getElementById('item-addon-form').style.display = 'block';
    document.getElementById('sound-addon-form').style.display = 'none';
});

document.getElementById('soundAddonBtn').addEventListener('click', function() {
    document.getElementById('item-addon-form').style.display = 'none';
    document.getElementById('sound-addon-form').style.display = 'block';
});

document.getElementById('item-addon-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const addonName = document.getElementById('addonName').value;

    const items = [];
    const itemElements = document.querySelectorAll('.item');
    itemElements.forEach((itemElement, index) => {
        const itemName = itemElement.querySelector(`[id=itemName${index + 1}]`).value;
        const itemDescription = itemElement.querySelector(`[id=itemDescription${index + 1}]`).value;
        const itemId = itemElement.querySelector(`[id=itemId${index + 1}]`).value;
        const itemTextureFile = itemElement.querySelector(`[id=itemTexture${index + 1}]`).files[0];

        items.push({
            "format_version": "1.10",
            "minecraft:item": {
                "description": {
                    "identifier": `custom:${itemId}`,
                    "category": "Misc",
                    "is_experimental": false
                },
                "components": {
                    "minecraft:icon": itemId,
                    "minecraft:display_name": itemName,
                    "minecraft:tooltip": itemDescription
                }
            },
            "textureFile": itemTextureFile  // テクスチャファイルの追加
        });
    });

    const addonDescription = `${addonName} - Made With Cookie Minecraft Addon maker`;

    const manifest = {
        "format_version": 2,
        "header": {
            "description": addonDescription,
            "name": addonName,
            "uuid": generateUUID(),
            "version": [1, 0, 0],
            "min_engine_version": [1, 17, 0]  // 最小のMinecraftエンジンバージョンを指定
        },
        "modules": [
            {
                "description": addonDescription,
                "type": "data",
                "uuid": generateUUID(),
                "version": [1, 0, 0]
            }
        ]
    };

    const licenseText = `MIT License

Copyright (c) 2024 ${addonName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

    const zip = new JSZip();
    zip.file("manifest.json", JSON.stringify(manifest, null, 4));
    items.forEach((item, index) => {
        zip.file(`items${index + 1}.json`, JSON.stringify(item, null, 4));
        if (item.textureFile) {
            zip.file(`textures/${item.textureFile.name}`, item.textureFile);
        }
    });
    zip.file("LICENSE.txt", licenseText);

    zip.generateAsync({ type: "blob" }).then(function(content) {
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.style.display = 'block';
        downloadBtn.onclick = function() {
            const element = document.createElement('a');
            element.href = URL.createObjectURL(content);
            element.download = `${addonName}.mcpack`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        };
    });

    document.getElementById('jsonOutput').textContent = JSON.stringify(items, null, 4);
});

document.getElementById('sound-addon-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const addonName = document.getElementById('soundAddonName').value;

    const sounds = [];
    const soundElements = document.querySelectorAll('.sound');
    soundElements.forEach((soundElement, index) => {
        const soundId = soundElement.querySelector(`[id=soundId${index + 1}]`).value;
        const soundFile = soundElement.querySelector(`[id=soundFile${index + 1}]`).files[0];

        sounds.push({
            "sound_id": soundId,
            "soundFile": soundFile
        });
    });

    const addonDescription = `${addonName} - Made With Cookie Minecraft Addon maker`;

    const manifest = {
        "format_version": 2,
        "header": {
            "description": addonDescription,
            "name": addonName,
            "uuid": generateUUID(),
            "version": [1, 0, 0],
            "min_engine_version": [1, 17, 0]  // 最小のMinecraftエンジンバージョンを指定
        },
        "modules": [
            {
                "description": addonDescription,
                "type": "resources",
                "uuid": generateUUID(),
                "version": [1, 0, 0]
            }
        ]
    };

    const licenseText = `MIT License

Copyright (c) 2024 ${addonName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

    const zip = new JSZip();
    zip.file("manifest.json", JSON.stringify(manifest, null, 4));
    sounds.forEach((sound, index) => {
        zip.file(`sounds/${sound.soundFile.name}`, sound.soundFile);
    });
    zip.file("LICENSE.txt", licenseText);

    zip.generateAsync({ type: "blob" }).then(function(content) {
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.style.display = 'block';
        downloadBtn.onclick = function() {
            const element = document.createElement('a');
            element.href = URL.createObjectURL(content);
            element.download = `${addonName}.mcpack`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        };
    });

    document.getElementById('jsonOutput').textContent = JSON.stringify(sounds, null, 4);
});

document.getElementById('addItem').addEventListener('click', function() {
    const itemsContainer = document.getElementById('items-container');
    const itemCount = itemsContainer.getElementsByClassName('item').length + 1;

    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <label for="itemName${itemCount}">アイテム名:</label>
        <input type="text" id="itemName${itemCount}" name="itemName" required><br>

        <label for="itemDescription${itemCount}">アイテムの説明:</label>
        <input type="text" id="itemDescription${itemCount}" name="itemDescription" required><br>

        <label for="itemId${itemCount}">アイテムID:</label>
        <input type="text" id="itemId${itemCount}" name="itemId" required><br>

        <label for="itemTexture${itemCount}">テクスチャファイル:</label>
        <input type="file" id="itemTexture${itemCount}" name="itemTexture" accept=".png, .jpg, .jpeg" required><br>
    `;
    itemsContainer.appendChild(newItem);
});

document.getElementById('addSound').addEventListener('click', function() {
    const soundsContainer = document.getElementById('sounds-container');
    const soundCount = soundsContainer.getElementsByClassName('sound').length + 1;

    const newSound = document.createElement('div');
    newSound.className = 'sound';
    newSound.innerHTML = `
        <label for="soundId${soundCount}">音のID:</label>
        <input type="text" id="soundId${soundCount}" name="soundId" required><br>

        <label for="soundFile${soundCount}">音ファイル:</label>
        <input type="file" id="soundFile${soundCount}" name="soundFile" accept=".mp3, .wav" required><br>
    `;
    soundsContainer.appendChild(newSound);
});

function generateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
}
