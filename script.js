const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then((res) => res.json()) //promise of json data
        .then((json) => displayLesson(json.data));
}


const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))

}
// {
//     "id": 73,
//     "level": 1,
//     "word": "Cat",
//     "meaning": "বিড়াল",
//     "pronunciation": "ক্যাট"
// }

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";

    words.forEach(word => {
        console.log(word)
        const card= document.createElement("div")
        card.innerHTML= `
        <div class="bg-white rounded-xl shadow-sm text-center py-8 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-medium text-lg">Meaning /Pronounciation</p>
            <div class="font-semibold text-xl">${word.meaning}/${word.pronunciation}</div>
            <div class="flex justify-between items-center mt-6">
                <button class="btn btn-circle"><i class="fa-solid fa-circle-info"></i></button>
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
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i></i>Lesson - ${lesson.level_no}</button>
   
    `;
        // 4.append into container 
        levelContainer.append(btnDiv)
    }
}


loadLessons();