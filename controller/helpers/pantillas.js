exports.plantilla = `
 <div style="width:100%; height:20rem; display:flex; justify-content:center; align-items:center;" >
     <div>
     <h1>Gracias por participar en la actividad</h1>
     </div>
 </div>
`
exports.plantillaConfirmar = `
 <div style="width:100%; height:20rem; display:flex; flex-direction:column; justify-content:center; align-items:center;" >
     <div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
     <h1>Por favor confirma tu entrada a esta actividad</h1>
     <h3>Juego 2</h3>
     <a href="https://www.google.com/" style="font-weight:bold; text-decoration:none;cursor:pointer; border-radius:6px; padding:0.5rem; background:blue; color:white;"> Confirmar entrada </a>
     </div>
 </div>
`
    // {/* <a href="https://devscaperooms.netlify.app/restore/t=${token}" style="font-weight:bold; text-decoration:none;cursor:pointer; border-radius:6px; padding:0.5rem; background:blue; color:white;"> Recuperar </a> */}

exports.plantillaRecover = (token)=>{
    return `
 <div style="width:100%; height:20rem; display:flex; flex-direction:column; justify-content:center; align-items:center;" >
     <div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
     <h1>Da click al siguente enlace para recuperar tu contraseña AMGEN.</h1>
     <h5>Si no has realizado esta petición ignora este mensaje.</h5>
     <a href="https://devscaperooms.netlify.app/restore/${token}" style="font-weight:bold; text-decoration:none;cursor:pointer; border-radius:6px; padding:0.5rem; background:blue; color:white;"> Recuperar </a>
     </div>
 </div>
`
}