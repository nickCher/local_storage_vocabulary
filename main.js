/*  TASK 4 (Практика по словарику)

    1. Реализовать тот функционал словарика что был на уроке
    2. Добавить кнопку удаления в каждой строке словарика, напротив каждой пары "слово-перевод"
    3. По нажатию на кнопку удаления - необходимо удалять эту строку, и эту пару "слово-перевод"
    4. Так же при удалении пары из самой таблицы, необходимо конечно же изменять localstorage и массив с объектами слов
    
    Подсказка: чтобы поймать индекс каждого row в таблице, в js есть метод rowIndex */

const engInput = document.getElementById('input-eng'),
      rusInput = document.getElementById('input-rus'),
      inputs = document.querySelectorAll('.inputs'),
      saveButton = document.getElementById('btn-add'),
      table = document.getElementById('table');
      deleteButton = document.getElementsByClassName('btn-delete');

let words = [];
localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
    table.innerHTML += `
        <tr> 
            <td>${words[index].english}</td>
            <td>${words[index].russian}</td>  
            <td><button class="btn-delete" onClick={deleteRow(this)}>Remove</button></td>
        </tr>        
  `
}

words.forEach((elem, index) => {
    addWordToTable(index);
});


class createWord {
    constructor(english, russian) {
        this.english = english;
        this.russian = russian;
    }
}

const deleteRow = (r) => {
    let i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);
    words.splice(i - 1, 1);
    localStorage.setItem('words', JSON.stringify(words));
}

saveButton.addEventListener('click', () => {
    if (
        engInput.value.length < 1 ||
        rusInput.value.length < 1 ||
        !isNaN(engInput.value)    ||
        !isNaN(rusInput.value)
    ) {
        for (let elem of inputs) {
            elem.classList.add('error');
        }
    } else {
        for (let elem of inputs) {
            elem.classList.remove('error');
        }
        words.push(new createWord(engInput.value, rusInput.value));
        localStorage.setItem('words', JSON.stringify(words));

        addWordToTable(words.length - 1);
        engInput.value = '';
        rusInput.value = '';
    }
});
