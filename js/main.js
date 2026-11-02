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
const tagList = document.querySelector(".tag-list");
const mainDisplay = document.querySelector("#main-display");
const gallery = document.querySelector("#gallery");

let galleryInstance = [];

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
    tagList.appendChild(fragmment);
}
createButtons();

function updateGallery(imageArray) {
    mainDisplay.innerHTML = "";
    gallery.innerHTML = "";

    const paragraph = document.createElement("P");
    paragraph.classList.add("flex-container");
    paragraph.classList.add("flex-start");
    paragraph.classList.add("tag-list");
    const isPlural = imageArray.length > 1;
    paragraph.innerHTML = `se a${isPlural ? "n" : ""} encontrado <strong>${imageArray.length}</strong> imagen${isPlural ? "es" : ""} con el tag <strong>${tag}</strong>`
    mainDisplay.appendChild(paragraph);

    imageArray.forEach((image, index)=>{
        const div = document.createElement("DIV");
        const h3 = document.createElement("H3");
        h3.innerText = image.title;
        const divImg = document.createElement("BUTTON");
        divImg.classList.add("img-button");
        const img = document.createElement("IMG");
        img.src = image.imgPath;
        img.alt = image.imgAlt;
        img.dataset.index = index;

        div.appendChild(h3);
        divImg.appendChild(img);
        div.appendChild(divImg);

        if (index === 0) {
            div.classList.add("main-card");
            mainDisplay.appendChild(div);
        } else {
            div.classList.add("other-card");
            fragmment.appendChild(div);
        }
    });

    gallery.appendChild(fragmment);
}

tagList.addEventListener("click", (event)=>{
    if (event.target.dataset.tag === undefined) {
        return;
    }

    const tag = event.target.dataset.tag;
    galleryInstance = getTaggedImagesWithTag(tag);

    updateGallery(galleryInstance);
});

gallery.addEventListener("click", (event)=>{
    if (event.target.dataset.index === undefined) {
        return;
    }
    [galleryInstance[0], galleryInstance[event.target.dataset.index]] = [galleryInstance[event.target.dataset.index], galleryInstance[0]];
    updateGallery(galleryInstance);
});