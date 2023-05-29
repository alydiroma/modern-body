const panels = () => {
    const panelGroups = document.querySelectorAll('[data-panel-group]');

    panelGroups.forEach((panelGroup) => {
        const panels = panelGroup.querySelectorAll('[data-panel]');
        const panelTriggers = panelGroup.querySelectorAll('[data-panel-trigger]');
        const panelTargets = panelGroup.querySelectorAll('[data-panel-target]');

        panels.forEach((panel) => {
            const panelTrigger = panel.querySelector('[data-panel-trigger]');
            const panelTarget = panel.querySelector('[data-panel-target]');
            const panelLinks = panelTarget.querySelectorAll('a, button');
            panelTarget.style.height = "";
            const panelTargetHeight = panelTarget.dataset.height;

            // show/hide clickable panel elements
            let panelLinksArr = [];
            const hideLinks = () => {
                if (panelLinks) {
                    panelLinksArr = Array.from(panelLinks);
    
                    panelLinksArr.forEach((link) => {
                        link.tabIndex = -1;
                    });
                }
            }
            const showLinks = () => {
                if (panelLinks) {
                    panelLinksArr = Array.from(panelLinks);
    
                    panelLinksArr.forEach((link) => {
                        link.tabIndex = '';
                    });
                }
            }

            setTimeout(() => {
                panelTarget.style.height = "0";
                panelTarget.style.visibility = "";
            }, 100);

            hideLinks();

            panelTrigger.addEventListener("click", (event) => {
                event.preventDefault();
                const triggered = panelTrigger.getAttribute('aria-expanded');

                panelTriggers.forEach((trigger) => {
                    trigger.setAttribute('aria-expanded', 'false');
                    hideLinks();
                });

                panelTargets.forEach((target) => {
                    target.style.height = "0";
                });

                if (triggered === 'false') {
                    panelTrigger.setAttribute('aria-expanded', 'true');
                    panelTarget.style.height = panelTargetHeight + 'px';
                    showLinks();
                }
            });
        });
    });
}

export default panels;