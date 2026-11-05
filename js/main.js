class TaggedImage {
    /**
     * Constructs a tagged image card.
     * @param {String} inImgPath 
     * @param {String} inImgAlt 
     * @param {String} inTitle 
     * @param {Array<String>} inTags
     */
    constructor(inImgPath, inImgAlt, inTitle, inTags) {
        this.imgPath = inImgPath;
        this.imgAlt = inImgAlt;
        this.title = inTitle;
        this.tags = inTags;
    }
};

const IMAGE_CARDS = [
    new TaggedImage(
        "assets/viajes/viajes-1.jpg",
        "viaje 1",
        "viaje 1",
        ["cosa", "mar", "arena", "ñ"],
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

/** @type {HTMLDivElement | null} */
const tagList = document.querySelector(".tag-list");
/** @type {HTMLDivElement | null} */
const mainDisplay = document.querySelector("#main-display");
/** @type {HTMLDivElement | null} */
const gallery = document.querySelector("#gallery");
/** @type {HTMLDivElement | null} */
const foundTagParagraph = document.querySelector("#found-tag-paragraph");

/** @type {Array<TaggedImage>} */
let galleryInstance = [];

/**
 * Returns a non repeating set of tags from an array of images with many tags.
 * @param {Array<TaggedImage>} imageData An array of cards.
 * @returns A Set of tags (strings).
 */
function getTagSet(imageData) {
    const tags = new Set();
    imageData.forEach((data)=>{
        data.tags.forEach((tag)=>{
            tags.add(tag);
        });
    });
    return tags;
}

/**
 * Used to filter image cards that contain a certain tag.
 * @param {Array<TaggedImage>} imageData An array of cards.
 * @param {String} tag The tag used to filter.
 * @returns Array of image card objects that contain tag.
 */
function getTaggedImagesWithTag(imageData, tag) {
    return imageData.filter((data)=>{
        return data.tags.includes(tag);
    });
}

/**
 * Creates tag buttons and adds them to the DOM.
 * Buttons store the tag they own using dataset.tag
 * @param {Array<TaggedImage>} imageData An array of cards.
 */
function createButtons(imageData) {
    const tags = getTagSet(imageData);
    for (let tag of tags) {
        const button = document.createElement("BUTTON");
        button.classList.add("filter-button");
        button.innerText = tag;
        button.dataset.tag = tag;
        fragmment.appendChild(button);
    }
    tagList?.appendChild(fragmment);
}
createButtons(IMAGE_CARDS);

/**
 * Displays an array of image cards creating the necessary elements and adding them to the DOM.
 * The first element of the array will be displayed as a large image.
 * @param {Array<TaggedImage>} imageArray An array of cards.
 */
function updateGallery(imageArray) {
    if (!mainDisplay || !gallery)
        return;

    mainDisplay.innerHTML = "";
    gallery.innerHTML = "";

    //const paragraph = document.createElement("P");
    //paragraph.classList.add("flex-container");
    //paragraph.classList.add("flex-start");
    //paragraph.classList.add("tag-list");
    //const isPlural = imageArray.length > 1;
    //paragraph.innerHTML = `se a${isPlural ? "n" : ""} encontrado <strong>${imageArray.length}</strong> imagen${isPlural ? "es" : ""} con el tag <strong>${tag}</strong>`
    //mainDisplay.appendChild(paragraph);

    imageArray.forEach((image, index)=>{
        const divElement = document.createElement("div");
        const h3Element = document.createElement("h3");
        h3Element.innerText = image.title;
        const divImgElement = document.createElement("button");
        divImgElement.classList.add("img-button");
        const imgElement = document.createElement("img");
        imgElement.src = image.imgPath;
        imgElement.alt = image.imgAlt;
        imgElement.dataset.index = String(index);

        divElement.appendChild(h3Element);
        divImgElement.appendChild(imgElement);
        divElement.appendChild(divImgElement);

        if (index === 0) {
            divElement.classList.add("main-card");
            mainDisplay.appendChild(divElement);
        } else {
            divElement.classList.add("other-card");
            fragmment.appendChild(divElement);
        }
    });

    gallery.appendChild(fragmment);
}

/**
 * Handles click events for the button list. 
 * Updates the gallery retrieving the tag from the clicked button.
 */
tagList?.addEventListener("click", (event)=>{
    const targetElement = /** @type {HTMLElement | null} */ (event.target);
    const tag = targetElement?.dataset.tag;
    if (tag) {
        galleryInstance = getTaggedImagesWithTag(IMAGE_CARDS, tag);
        updateGallery(galleryInstance);

        if (foundTagParagraph) {
            const isPlural = galleryInstance.length > 1;
            foundTagParagraph.innerHTML = `se a${isPlural ? "n" : ""} encontrado <strong>${galleryInstance.length}</strong> imagen${isPlural ? "es" : ""} con el tag <strong>${tag}</strong>`;
        }
    }
});

/**
 * Handles clicking on images.
 * It swaps the first and the clicked element in the galleryInstance array and redraws.
 */
gallery?.addEventListener("click", (event)=>{
    const targetElement = /** @type {HTMLElement | null} */ (event.target);
    const index = Number(targetElement?.dataset.index);
    if (isNaN(index)) {
        return;
    }
    [galleryInstance[0], galleryInstance[index]] = [galleryInstance[index], galleryInstance[0]];
    updateGallery(galleryInstance);
});