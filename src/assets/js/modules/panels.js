const panels = () => {
    const panelGroups = document.querySelectorAll('[data-panel-group]');

    panelGroups.forEach((panelGroup) => {
        const panels = panelGroup.querySelectorAll('[data-panel]');
        const panelTriggers = panelGroup.querySelectorAll('[data-panel-trigger]');
        const panelTargets = panelGroup.querySelectorAll('[data-panel-target]');

        panels.forEach((panel) => {
            const panelTrigger = panel.querySelector('[data-panel-trigger]');
            const panelTarget = panel.querySelector('[data-panel-target]');
            panelTarget.style.height = "";
            const panelTargetHeight = panelTarget.offsetHeight;

            setTimeout(() => {
                panelTarget.style.height = "0";
                panelTarget.style.visibility = "";
            }, 100);

            panelTrigger.addEventListener("click", (event) => {
                event.preventDefault();
                const triggered = panelTrigger.getAttribute('aria-expanded');

                panelTriggers.forEach((trigger) => {
                    trigger.setAttribute('aria-expanded', 'false');
                });

                panelTargets.forEach((target) => {
                    target.style.height = "0";
                });

                if (triggered === 'false') {
                    panelTrigger.setAttribute('aria-expanded', 'true');
                    panelTarget.style.height = panelTargetHeight + 'px';
                }
            });
        });
    });
}

export default panels;