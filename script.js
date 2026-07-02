const a = document.querySelectorAll('h2');

console.log(a);
console.warn('aの中身を確認する');

for (let i = 0; i < a.length; i++) {
    a[i].innerText = (i + 1) + '番目のh2です';
}