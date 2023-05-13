document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addWord').onclick = function () {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim();
    if (!word) return;

    chrome.storage.sync.get('blockedWords', function (data) {
        const blockedWords = data.blockedWords || [];
        blockedWords.push(word);
        chrome.storage.sync.set({ blockedWords: blockedWords }, function () {
        wordInput.value = '';
        loadBlockedWords();
        });
    });
    };

    function loadBlockedWords() {
        chrome.storage.sync.get('blockedWords', function (data) {
            const wordList = document.getElementById('wordsList');
            wordList.innerHTML = '';
    
            const blockedWords = data.blockedWords || [];
            blockedWords.forEach((word, index) => {
                const listItem = document.createElement('li');
                const removeItem = document.createElement('span');
                
                listItem.setAttribute('class', 'item');
                listItem.textContent = word;
    
                // Add cursor: pointer and margin-left: 10px styles
                removeItem.style.cursor = 'pointer';
                removeItem.style.marginLeft = '10px';
                removeItem.textContent = '-';
                removeItem.addEventListener('click', function() {
                    listItem.remove();
                    // Remove word from blockedWords array
                    blockedWords.splice(index, 1);
                    // Update chrome storage
                    chrome.storage.sync.set({ blockedWords: blockedWords });
                });
                
                listItem.appendChild(removeItem);
                wordList.appendChild(listItem);
            });
        });
    }
    

    loadBlockedWords();
});
