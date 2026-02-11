// 🏏 BPL 2026 DATA
const pointsTableData = [
    { name: "PITCH PIRATES",    m: 0, w: 0, l: 0, rs: 0, of: 0, rc: 0, ob: 0, form: [] },
    { name: "ROYAL BHUTANU",   m: 0, w: 0, l: 0, rs: 0, of: 0, rc: 0, ob: 0, form: [] },
    { name: "YOUNG STAR 11", m: 0, w: 0, l: 0, rs: 0, of: 0, rc: 0, ob: 0, form: [] },
    { name: "GARUDA 11",   m: 0, w: 0, l: 0, rs: 0, of: 0, rc: 0, ob: 0, form: [] }
];

function updatePointsTable() {
    const table = document.getElementById("pointsTable");
    if (!table) return;

    // NRR aur Points calculate karna
    let finalData = pointsTableData.map(team => {
        let nrr = (team.of > 0 && team.ob > 0) ? (team.rs / team.of) - (team.rc / team.ob) : 0;
        return { ...team, nrr: nrr.toFixed(3), pts: team.w * 2 };
    });

    // Ranking Logic
    finalData.sort((a, b) => b.pts - a.pts || parseFloat(b.nrr) - parseFloat(a.nrr));

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
        let nrrColor = parseFloat(t.nrr) > 0 ? "#00ff00" : (parseFloat(t.nrr) < 0 ? "#ff4d4d" : "#fff");
        
        // Form circles logic
        let formHTML = t.form.map(res => 
            `<span style="background:${res==='W'?'#00cc00':'#ff3333'}; color:white; padding:2px 7px; border-radius:50%; font-size:10px; margin-right:3px; font-weight:bold; display:inline-block; min-width:20px; text-align:center;">${res}</span>`
        ).join('');

        html += `<tr>
            <td style="color:#ffd700;">${i + 1}</td>
            <td style="text-align:left; padding-left:15px; color:#ffd700; font-weight:bold;">${t.name}</td>
            <td>${t.m}</td>
            <td>${t.w}</td>
            <td>${t.l}</td>
            <td style="color:${nrrColor}">${parseFloat(t.nrr) > 0 ? '+' : ''}${t.nrr}</td>
            <td style="color:#ef008c; font-weight:900; font-size:16px;">${t.pts}</td>
            <td>${formHTML || '-'}</td>
        </tr>`;
    });

    table.innerHTML = html + `</tbody>`;
}

window.onload = updatePointsTable;