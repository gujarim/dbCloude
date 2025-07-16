// 공통 header/footer 불러오기
document.addEventListener("DOMContentLoaded", () => {
    // header 불러오기
    fetch("layout/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    // nav 불러오기
    fetch("layout/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav").innerHTML = data;

            menuToggle();
            tab();
        });

    // footer 불러오기
    // fetch("layout/footer.html")
    //     .then(response => response.text())
    //     .then(data => {
    //         document.getElementById("footer").innerHTML = data;
    //     });
});