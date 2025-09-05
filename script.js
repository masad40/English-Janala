
const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class = "btn" >${el}</span>`);
    return htmlElements.join(" ");
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then((res) => res.json()) //promise of json data
        .then((json) => displayLesson(json.data));
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active")

            displayLevelWord(data.data)

        })

}
// {
//     "id": 73,
//     "level": 1,
//     "word": "Cat",
//     "meaning": "বিড়াল",
//     "pronunciation": "ক্যাট"
// }

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id} `;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
// id
// : 
// 90
// level
// : 
// 1
// meaning
// : 
// "পানি"
// partsOfSpeech
// : 
// "noun"
// points
// : 
// 1
// pronunciation
// : 
// "ওয়াটার"
// sentence
// : 
// "We need water to live."
// synonyms
// : 
// (3) ['liquid', 'H2O', 'drink']
// word
// : 
// "Water"
// [[Prototype]]
// : 
// Object

const displayWordDetails = (word) => {
    // console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="" id="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div class="" id="">
                    <h2 class=" font-semibold text-xl">Meaning</h2>
                    <p class=" font-semibold text-lg hind-font">${word.meaning}</p>
                </div>
                <div class="" id="">
                    <h2 class=" font-semibold text-xl">Example</h2>
                    <p class="">${word.sentence}</p>
                </div>
                <div class="" id="">
                    <h2 class=" font-semibold text-xl hind-font">সমার্থক শব্দ গুলো</h2>
                    <div class="">${createElements(word.synonyms)}</div>
                </div>
    
    `
    document.getElementById("my_modal").showModal();

};


const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `<div class="text-center col-span-full space-y-5  p-6 rounded-xl">
        <i class="fa-solid fa-hourglass-half text-8xl text-gray-500/50"></i>
            <p class="hind-font text-[#79716B] text-lg">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="hind-font font-medium text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`
    }

    words.forEach(word => {
        // console.log(word)
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-8 px-5 space-y-4">

            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>

            <p class="font-medium text-lg">Meaning /Pronounciation</p>

            <div class="font-semibold text-xl hind-font">${word.meaning ? word.meaning : "শব্দ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "শব্দ পাওয়া যায়নি"}</div>

            <div class="flex justify-between items-center mt-6">

                <button  onclick="loadWordDetail(${word.id})" class="btn btn-circle"><i class="fa-solid fa-circle-info"></i></button>

                <button class="btn btn-circle"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
}

const displayLesson = (lessons) => {
    // 1.get the container
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2.get into every lessons
    for (let lesson of lessons) {
        //  3.create Element
        // console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i></i>Lesson - ${lesson.level_no}</button>
   
    `;
        // 4.append into container 
        levelContainer.append(btnDiv)
    }
}


loadLessons();