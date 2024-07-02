const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const detailDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const years = [];

function createYearCalendar(year) {

    let underLimit = year - 30;
    let upperLimit = year + 30;

    document.getElementById('calendar').style.display = 'block';
    document.getElementById('head').style.display = 'flex';
    const calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = '';

    for (let i = underLimit; i <= upperLimit; i++) {
        year = i;
        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
    
            let id = 'y' + year + '-' + ( month + 1 ) 
    
            // Tạo bảng cho tháng
            const table = document.createElement('table');
            table.setAttribute("id", id);

            let row = document.createElement("tr");
    
            for (let i = 0; i < firstDayOfMonth; i++) {
                row.appendChild(document.createElement("td"));
            }
            for (let day = 1; day <= daysInMonth; day++) {
                const cell = document.createElement("td");
                //====================
                const bt = document.createElement('button');

                let choosenDay = 'y' + i + '-' + (month + 1) + '-' + day;
                bt.innerText = day;
                bt.setAttribute('id', choosenDay)
                bt.addEventListener("click", function() {
                    chooseDay(this.id);
                })
                cell.appendChild(bt)
                //====================
                // cell.innerText = day;
                if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    cell.classList.add("today");
                }
                row.appendChild(cell);
                if (row.children.length === 7) {
                    table.appendChild(row);
                    row = document.createElement("tr");
                }
            }
            while (row.children.length < 7) {
                row.appendChild(document.createElement("td"));
            }
            table.appendChild(row);
            calendarContainer.appendChild(table);
        }
    }
    let sth = 'y' + underLimit + '-' + 1;
    document.getElementById(sth).style.marginTop = 0;

    let today = new Date();

    let id = 'y' + today.getFullYear() + '-' + ( today.getMonth() + 1 );

    scrollThings(id);
}

function day2month(year) {

    let underLimit = year - 30;
    let upperLimit = year + 30;

    let y = document.getElementById('dmy').innerText;
    y = y.split(" ");
    console.log(y[1]);

    document.getElementById('calendar').style.display = 'none';
    document.getElementById('head').style.display = 'none';
    document.getElementById('monthCalendar').style.display = 'block';
    const calendarContainer = document.getElementById("monthCalendar");
    calendarContainer.innerHTML = '';

    for (let i = underLimit; i <= upperLimit; i++) {
        year = i;

        let id = 'y' + year;
        const table = document.createElement('table');
        table.setAttribute('id', id);

        let row = document.createElement("tr");

        for (let month = 0; month < 12; month++) {
            const cell = document.createElement('td');
            const bt = document.createElement('button');

            let choosenMonth = 'c' + i + '-' + (month + 1);
            bt.innerText = mNames[month];
            bt.setAttribute('id', choosenMonth)
            bt.addEventListener("click", function() {
                month2day(this.id);
            })
            cell.appendChild(bt)
            if (month === new Date().getMonth() && year === new Date().getFullYear()) {
                cell.classList.add("today");
            }
            row.appendChild(cell);
            if (row.children.length === 4) {
                table.appendChild(row);
                row = document.createElement('tr');
            }
        }
        table.appendChild(row);
        calendarContainer.appendChild(table);
    }
    let today = new Date();
    document.getElementById('dmy').style.display = 'none'
    document.getElementById('my').style.display = 'flex';
    document.getElementById('my').innerHTML = today.getFullYear();

    let id = 'y' + y[1];

    scrollThings(id);
}

function times(first, last) {
    let count = 1;
    while(true) {
        if (first + 10 <= last) {
            count  = count + 1;
            first = first + 10;
        } else {
            break;
        }
    }
    return parseInt(count);
}

function month2year(year) {

    let underLimit = year - 30;
    let upperLimit = year + 30;

    

    let y = document.getElementById('my').innerText;
    y = 'c' + y;

    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'block';
    const calendarContainer = document.getElementById("yearCalendar");
    calendarContainer.innerHTML = '';

    let un = underLimit;
    let up = 0;

    let check = times(underLimit, upperLimit)

    for (let i = 0; i < check ; i++) {
        if (i == 0) {
            un = parseInt(underLimit);
            const mising = 9 - (un % 10);
            up = un + mising;
        } else if (i == check - 1) {
            un = up + 1;
            up = upperLimit;
        } else {
            un = up + 1;
            up = un + 9;
        }

        // year = i + '';
    
        let id = 'y' + un + '-' + up;
        years.push(id);
        console.log(id);
        const table = document.createElement('table');
        table.setAttribute('id', id);
    
        let row = document.createElement("tr");

        const filter = document.createElement('td');
        filter.innerHTML = ''
        const filter1 = document.createElement('td');
        filter.innerHTML = ''

        if (i % 2 == 1) {
            row.appendChild(filter);
            row.appendChild(filter1);
        }

        
    
        for (let j = un; j <= up; j++) {   
            const cell = document.createElement('td');
            const bt = document.createElement('button');
    
            let choosenYear = 'c' + j;
            bt.innerText = j;
            bt.setAttribute('id', choosenYear);
            bt.addEventListener("click", function() {
                year2month(this.id);
            });
    
            cell.appendChild(bt);
            if (j === new Date().getFullYear()) {
                cell.classList.add("today");
            }

            row.appendChild(cell);
            if (row.children.length === 4) {
                table.appendChild(row);
                row = document.createElement('tr');
            }
        }

        table.appendChild(row);
        calendarContainer.appendChild(table);

        if (i % 2 == 1) {
            document.getElementById(id).style.margintop = 100;
        }
    }
    scrollThings(y);
}

function year2month(year) {
    let i = year + '';
    i = i.replace('c', 'y');
    document.getElementById('yearCalendar').style.display = 'none';
    let today = new Date();
    console.log(today);
    day2month(today.getFullYear());

    const targetTable = document.getElementById(i);
    if (targetTable) {
        targetTable.scrollIntoView({ behavior: "instant", block: "center" });
    }
}

function month2day(year) {
    let i = year + '';
    i = i.replace('c', 'y');
    document.getElementById('monthCalendar').style.display = 'none';
    let today = new Date();
    createYearCalendar(today.getFullYear());
    document.getElementById('my').style.display = 'none';
    document.getElementById('dmy').style.display = 'flex';

    const targetTable = document.getElementById(i);
    if (targetTable) {
        targetTable.scrollIntoView({ behavior: "instant", block: "start" });
    }
}


function nextMonth() {
    const thisMonth = document.getElementsByClassName('active');
    let theID = thisMonth[0].id + '';

    let theYear = theID.substring(1,5);
    let theMonth = 1;
    if (theID.length === 7 ) {
        theMonth = theID.substring(6,7);
    } else {
        theMonth = theID.substring(6,8);
    }

    let nextYear = theYear;
    let nextMonth = parseInt(theMonth) + 1;
    if (nextMonth == 13) {
        nextYear = parseInt(theYear) + 1;
        nextMonth = 1;
    }

    let thisDecade = years.indexOf(theID)
    let nextDecade = 1;

    if (thisDecade == years.length - 1) {
        nextDecade = thisDecade ;
    } else {
        nextDecade = thisDecade + 1;
    }

    if (theID.length >= 10) {
        const targetTable = document.getElementById(years[nextDecade]);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    } else if (theID.length >= 7) {
        theID = 'y' + nextYear + '-' + nextMonth;
        const targetTable = document.getElementById(theID);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    } else {
        nextYear = parseInt(nextYear) + 1;
        theID = 'y' + nextYear;
        const targetTable = document.getElementById(theID);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}

function preMonth() {
    const thisMonth = document.getElementsByClassName('active');
    let theID = thisMonth[0].id + '';

    let theYear = theID.substring(1,5);
    let theMonth = 1;
    if (theID.length === 7 ) {
        theMonth = theID.substring(6,7);
    } else {
        theMonth = theID.substring(6,8);
    }

    let preYear = theYear;
    let preMonth = parseInt(theMonth) - 1;
    if (preMonth == 0) {
        preYear = parseInt(theYear) - 1;
        preMonth = 12;
    }

    let thisDecade = years.indexOf(theID)
    let nextDecade = 1;

    if (thisDecade == 0) {
        nextDecade = thisDecade ;
    } else {
        nextDecade = thisDecade - 1;
    }

    if (theID.length >= 10) {
        const targetTable = document.getElementById(years[nextDecade]);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    } else if (theID.length >= 7){
        theID = 'y' + preYear + '-' + preMonth;
        const targetTable = document.getElementById(theID);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    } else {
        nextYear = parseInt(preYear) - 1;
        theID = 'y' + nextYear;
        const targetTable = document.getElementById(theID);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}

//Chỉnh css các mục nút khác
const today = new Date();

let d = detailDay[today.getDay()] + ', ' + monthNames[today.getMonth()] + ' ' + today.getDate();
let b = document.getElementById('dateBtn');
b.innerHTML = d;

b.addEventListener("click", function() {
    document.getElementById('monthCalendar').style.display = 'none';
    document.getElementById('yearCalendar').style.display = 'none';
    document.getElementById('my').style.display = 'none';
    document.getElementById('dmy').style.display = 'block';
    createYearCalendar(2024);
})
b.classList.add('dateBtn');

document.getElementById('date').appendChild(b);

let zoom = document.createElement('button');
let down = document.createElement('img');
down.src = 'calen/down.jpg';


zoom.appendChild(down);
zoom.addEventListener("click", function() {
    outOfOrder();
})
document.getElementById('date').appendChild(zoom);

createYearCalendar(new Date().getFullYear());

function scrollThings(id) {
    //Di chuyển tới đâu

    if (id.length == 5) {
        const targetTable = document.getElementById(id);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "instant", block: "center" });
        }
    } else {
        const targetTable = document.getElementById(id);
        if (targetTable) {
            targetTable.scrollIntoView({ behavior: "instant", block: "start" });
        }
    }


    //Thì sáng tới đó
    const container = document.querySelector(".scroll-container");
    const tables = document.querySelectorAll("table");
      
    function isElementInViewport(el, container) {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
    
        return (
            rect.top >= containerRect.top &&
            rect.bottom <= containerRect.bottom 
        );
    }

    function check() {
        tables.forEach(table => {
            let check = document.getElementsByClassName('active');
            if (check != null) {
                table.classList.remove("active");
            }
        })
    }
      
    function checkTablesInView() {
        tables.forEach(table => {

            if (isElementInViewport(table, container)) {
                check();
                let name = table.id + '';
                if (name.length === 7 ) {
                    document.getElementById('dmy').innerHTML = monthNames[name.substring(6,7) - 1] + ' ' + name.substring(1, 5);
                } else if (name.length === 8) {
                    document.getElementById('dmy').innerHTML = monthNames[name.substring(6,8) - 1] + ' ' + name.substring(1, 5);
                } else if (name.length === 10) {
                    document.getElementById('my').innerHTML = name.substring(1, 10);
                } else {
                    document.getElementById('my').innerHTML = name.substring(1, 5);
                }
                table.classList.add("active");
                let special = document.getElementById('my').innerText;
                let tableID = table.id + '';
                
                if (special.length === 10) {
                    tableID = tableID.substring(1, 10);

                    if (tableID == special) {
    
                        const buttons = document.querySelectorAll('#' + table.id + ' button');
    
                        buttons.forEach(button => {
                            button.style.color = 'white';
                        });
                    }
                } else {
                    tableID = tableID.substring(1, 5);

                    if (tableID == special) {
    
                        const buttons = document.querySelectorAll('#' + table.id + ' button');
    
                        buttons.forEach(button => {
                            button.style.color = 'white';
                        });
                    }
                }

            } else {
                const buttons = document.querySelectorAll('#' + table.id + ' button');

                buttons.forEach(button => {
                    button.style.color = '#7D7D7D';
                });
            }
        });
    }
      
    container.addEventListener("scroll", checkTablesInView);
    window.addEventListener("resize", checkTablesInView);
    
    checkTablesInView();
}


//Đặt thời gian
function lessTime() {
    let t = document.getElementById('focus');
    console.log(t);
    let n = parseInt(t.textContent);
    if ( n == 5 ) {
        document.getElementById('focus').innerHTML = n ;
    } else if  (n <= 30 ) {
        document.getElementById('focus').innerHTML = n - 5;
    } else {
        document.getElementById('focus').innerHTML = n - 15;
    }
    console.log('clicked');
}

function moreTime() {
    let t = document.getElementById('focus');
    console.log(t);
    let n = parseInt(t.textContent);
    if ( n >= 240 ) {
        document.getElementById('focus').innerHTML = n;
    } else if  (n >= 30 ) {
        document.getElementById('focus').innerHTML = n + 15;
    } else {
        document.getElementById('focus').innerHTML = n + 5;
    }
    console.log('clicked');
}

function outOfOrder() {
    alert('Tính năng này hiện tại chưa có mong bạn thử cái khác');
}

document.getElementById('scroll-container').addEventListener('wheel', function(e) {
    e.preventDefault();
    let scrollAmount = 20;

    if (e.deltaY > 0) {
        this.scrollTop += scrollAmount;
    } else {
        this.scrollTop -= scrollAmount;
    }
});

let dayID = 1;

function chooseDay(id) {
    if (dayID != id) {
        if (dayID != 1) {
            document.getElementById(dayID).classList.remove('selectDay');
        }
        let day = document.getElementById(id);
        day.classList.add('selectDay');
        console.log('clicked');
        dayID = id;
    } else {
        console.log('none');
    }

}