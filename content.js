const manualTargets = [
    {
        "selector": "button[aria-label='Rozumuj'] span div",
        "target": ["Rozumuj"],
        "replacement": "Pomyślunek"
    },
    {
        "selector": "div.text-token-text-secondary",
        "target": ["ChatGPT"],
        "replacement": "SzatŻePeTe"
    }
]

const config = {
    childList: true,
    subtree: true,
    characterData: true
};

async function applyManualReplacement(targetInfo) {
    const elements = document.querySelectorAll(targetInfo.selector);

    if (elements.length === 0) {
        return;
    }

    elements.forEach(element => {
        let textChanged = false;

        targetInfo.target.forEach(target => {
            if (element.textContent && element.textContent.includes(target)) {
                element.textContent = element.textContent.replace(new RegExp(target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), targetInfo.replacement);
                textChanged = true;
            }
        });
    });
}

async function runAllManualReplacements() {
    manualTargets.forEach(applyManualReplacement);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllManualReplacements);
} else {
    runAllManualReplacements();
}

const containerElement = document.body;

if (containerElement) {
    const observer = new MutationObserver((mutations) => {
        runAllManualReplacements();
    });

    observer.observe(containerElement, {
        childList: true,
        subtree: true,
        attributes: true
    });
} else {
    setTimeout(runAllManualReplacements, 2000);
}
