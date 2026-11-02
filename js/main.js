class TaggedImage {
    constructor(inImgPath, inImgAlt, inTitle, inTags) {
        this.imgPath = inImgPath;
        this.imgAlt = inImgAlt;
        this.title = inTitle;
        this.tags = inTags;
    }
};

const imageData = [
    new TaggedImage(
        "assets/viajes/viajes-1.jpg",
        "viaje 1",
        "viaje 1",
        ["cosa", "mar", "arena"],
    ),
    new TaggedImage(
        "assets/viajes/viajes-2.jpg",
        "viaje 2",
        "viaje 2",
        ["cosa", "mar", "edificio", "arena"],
    ),
    new TaggedImage(
        "assets/viajes/viajes-3.jpg",
        "viaje 3",
        "viaje 3",
        ["cosa", "senales"],
    ),
    new TaggedImage(
        "assets/viajes/viajes-4.jpg",
        "viaje 4",
        "viaje 4",
        ["cosa", "edificio"],
    ),
    new TaggedImage(
        "assets/viajes/viajes-5.jpg",
        "viaje 5",
        "viaje 5",
        ["cosa", "edificio"],
    ),
    new TaggedImage(
        "assets/viajes/viajes-6.jpg",
        "viaje 6",
        "viaje 6",
        ["cosa", "mar"],
    ),
    new TaggedImage(
        "assets/viajes/viajes-7.jpg",
        "viaje 7",
        "viaje 7",
        ["cosa", "edificio"],
    ),
];

const fragmment = document.createDocumentFragment();
const buttonSection = document.querySelector(".tag-list");
const mainDisplaySection = document.querySelector("#main-display");
const gallerySection = document.querySelector("#gallery");

function getTagSet() {
    const tags = new Set();
    imageData.forEach((data)=>{
        data.tags.forEach((tag)=>{
            tags.add(tag);
        });
    });
    return tags;
}

function getTaggedImagesWithTag(tag) {
    return imageData.filter((data)=>{
        return data.tags.includes(tag);
    });
}

function createButtons() {
    const tags = getTagSet();
    for (tag of tags) {
        const button = document.createElement("BUTTON");
        button.classList.add("filter-button");
        button.innerText = tag;
        button.dataset.tag = tag;
        fragmment.appendChild(button);
    }
    buttonSection.appendChild(fragmment);
}
createButtons();

buttonSection.addEventListener("click", (event)=>{
    mainDisplaySection.innerHTML = "";
    gallerySection.innerHTML = "";

    const tag = event.target.dataset.tag;
    const images = getTaggedImagesWithTag(tag);

    const paragraph = document.createElement("P");
    paragraph.classList.add("flex-container");
    paragraph.classList.add("flex-start");
    paragraph.classList.add("tag-list");
    const isPlural = images.length > 1;
    paragraph.innerHTML = `se a${isPlural ? "n" : ""} encontrado <strong>${images.length}</strong> imagen${isPlural ? "es" : ""} con el tag <strong>${tag}</strong>`
    mainDisplaySection.appendChild(paragraph);

    images.forEach((image, index)=>{
        const divSection = document.createElement("DIV");
        const h3Section = document.createElement("H3");
        h3Section.innerText = image.title
        const divImgSection = document.createElement("DIV");
        const imgSection = document.createElement("IMG");
        imgSection.src = image.imgPath;
        imgSection.alt = image.imgAlt;

        divSection.appendChild(h3Section);
        divImgSection.appendChild(imgSection);
        divSection.appendChild(divImgSection);

        if (index === 0) {
            divSection.classList.add("main-card");
            mainDisplaySection.appendChild(divSection);
        } else {
            divSection.classList.add("other-card");
            fragmment.appendChild(divSection);
        }
    });

    gallerySection.appendChild(fragmment);
});