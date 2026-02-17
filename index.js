// 🏏 BPL 2026 DATA
const pointsTableData = [
    { name: "PITCH PIRATES", m: 4, w: 4, l: 0, nrr: "+3.84", form: ["W", "W", "W", "W"] },
    { name: "YOUNG STAR 11", m: 4, w: 3, l: 1, nrr: "+1.67", form: ["W", "L", "W", "W"] },
    { name: "ROYAL BHUTANU",  m: 4, w: 1, l: 3, nrr: "-2.55", form: ["L", "W", "L", "L"] },
    { name: "GARUDA 11",     m: 4, w: 0, l: 4, nrr: "-2.96", form: ["L", "L", "L", "L"] }
];

function updatePointsTable() {
    const table = document.getElementById("pointsTable");
    if (!table) return;

    // Points calculation automatic: W * 2
    let finalData = pointsTableData.map(team => {
        return { 
            ...team, 
            pts: team.w * 2 // Points yahan auto-calculate ho rahe hain
        }; 
    });

    // Ranking Logic (Points pehle, fir NRR)
    finalData.sort((a, b) => {
        if (b.pts !== a.pts) {
            return b.pts - a.pts; // Jiske zyada points wo upar
        }
        return parseFloat(b.nrr) - parseFloat(a.nrr); // Points same toh NRR dekho
    });

    let html = `<thead>
        <tr>
            <th>RANK</th>
            <th style="text-align:left; padding-left:15px;">TEAM</th>
            <th>M</th>
            <th>W</th>
            <th>L</th>
            <th>NRR</th>
            <th>PTS</th>
            <th>FORM</th>
        </tr>
    </thead><tbody>`;

    finalData.forEach((t, i) => {
        let nrrVal = parseFloat(t.nrr);
        let nrrColor = nrrVal > 0 ? "#00ff00" : (nrrVal < 0 ? "#ff4d4d" : "#fff");
        
        let formHTML = t.form.map(res => 
            `<span style="background:${res==='W'?'#00cc00':'#ff3333'}; color:white; padding:2px 7px; border-radius:50%; font-size:10px; margin-right:3px; font-weight:bold; display:inline-block; min-width:20px; text-align:center;">${res}</span>`
        ).join('');

        html += `<tr>
            <td style="color:#ffd700;">${i + 1}</td>
            <td style="text-align:left; padding-left:15px; color:#ffd700; font-weight:bold;">${t.name}</td>
            <td>${t.m}</td>
            <td>${t.w}</td>
            <td>${t.l}</td>
            <td style="color:${nrrColor}">${t.nrr}</td> 
            <td style="color:#ef008c; font-weight:900; font-size:16px;">${t.pts}</td>
            <td>${formHTML || '-'}</td>
        </tr>`;
    });

    table.innerHTML = html + `</tbody>`;
}

window.onload = updatePointsTable;
