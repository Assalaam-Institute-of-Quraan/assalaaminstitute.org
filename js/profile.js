function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

window.onload = async () => {
    const host = await new Promise((res) => {
        fetch('/leaderboard-sys/HOST')
        .then((response) => response.text())
        .then((data) => res(data));
    })

    const name = getParameterByName('name');
    console.log(name);
    if(name == '' || name == null) window.location.href = '/leaderboard';
    document.querySelector('title').textContent = `Student Profile: ${name}`;
    document.querySelector('.post-heading > h1 > center').textContent = `Profile: ${name}`;

    const profile = await new Promise((res) => fetch(`${host}/profile/${name}?pass=aiqftw`).then((res) => res.json()).then((data) => res(data)));
    if(profile.error) alert(profile.error);
    console.log(profile)
    profile.forEach((day) => {
        const date = new Date(day.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const parent = document.querySelector('.mainContent');
        const html = 
        `<tr>
            <th scope="row">${date}</th>
            <td>${day.sabaq}</td>
            <td>${day.sabaqpara}</td>
            <td>${day.dour}</td>
            <td>${day.behaviour}</td>
            <td>${day.attendance}</td>
            <td>${day.clothing}</td>
            <td>${day.points}</td>
        </tr>`;
        
        parent.insertAdjacentHTML('beforeend', html);
    })
}