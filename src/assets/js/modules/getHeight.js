const getHeight = () => {
    const els = document.querySelectorAll('[data-height]');

    let heightArr = [];
    if (els) {
        heightArr = Array.from(els);

        heightArr.forEach((el) => {
            const height = el.offsetHeight;
            el.setAttribute('data-height', height)
        });
    }
}

export default getHeight;