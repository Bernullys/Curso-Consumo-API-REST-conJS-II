const observer = new IntersectionObserver((entries) => {
    entries.filter(intersectionFunction).forEach(takeActionFunction)
});

const intersectionFunction = (entry) => {
    return entry.isIntersecting;
};

const takeActionFunction = (entry) => {
    const image = entry.target;
    const url = image.dataset.src;
    image.src = url;
    observer.unobserve(image);
};

export const registerImages = (image) => {
    observer.observe(image);
};