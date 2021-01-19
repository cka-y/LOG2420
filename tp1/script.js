const pageContentTarget = document.getElementsByTagName('main')[0];
const headerContentTarget = document.getElementsByTagName('header')[0];
const publicHeaderContent = headerContentTarget.innerHTML;


serverRequest('source/mission.html', pageContentTarget);
loadSignsListeners();
loadNavigationListeners();

function loadNavigationListeners(){
    let navItems = document.getElementsByClassName('nav-item');
    for (let i = 0; i <navItems.length; i++){
        navItems[i].addEventListener('click', function (event){
            let target = event.currentTarget;
            if (target.classList.contains('active')) return;
            serverRequest(target.getAttribute('data-source'), pageContentTarget);
            document.getElementsByClassName('active')[0].classList.remove('active');
            target.classList.add('active');

        })
    }
}


function loadSignsListeners(){
    let signButtons = document.getElementsByClassName('sign');
    for (let i = 0; i < signButtons.length; i++) {
        signButtons[i].addEventListener('click', function (event){
            let target = event.currentTarget;
            let source = target.getAttribute('data-source');

            if (source === null) return;

            serverRequest(source, pageContentTarget);

            if (source.includes('mission.html')){
                headerContentTarget.innerHTML = publicHeaderContent;
                loadNavigationListeners();
            }
            else serverRequest(target.getAttribute('data-header'), headerContentTarget);

            loadSignsListeners();
        });
    }
}


function serverRequest(fileName, target){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            target.innerHTML = this.responseText;
            loadSignsListeners();
        }
    };
    xhttp.open("GET", fileName, true);
    xhttp.send();
}
