/* Save as: style.css */
display:flex;
align-items:center;
justify-content:center;
padding:2rem;
}
.container{width:100%;max-width:860px}
.brand{text-align:center;margin-bottom:1rem}
.brand h1{margin:.2rem 0;font-size:1.6rem}
.muted{color:var(--muted)}
.card{
background:var(--card);
border-radius:var(--radius);
padding:1rem 1.25rem;
box-shadow:0 6px 20px rgba(20,20,50,0.08);
margin-bottom:1rem;
}
form.card{padding:1.25rem}
.field{margin-bottom:0.85rem}
.field label{display:block;font-weight:600;margin-bottom:.25rem}
.field input{width:100%;padding:.6rem .75rem;border-radius:8px;border:1px solid #e6e9f2;font-size:0.95rem}
.field input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(91,108,255,0.08)}
.password-row{display:flex;gap:.5rem}
.password-row input{flex:1}
.password-row button{border:1px solid #e6e9f2;padding:.45rem .6rem;background:transparent;border-radius:8px;cursor:pointer}
meter{width:100%;height:8px;border-radius:6px;margin-top:.45rem}
.actions{text-align:right;margin-top:.5rem}
button[type="submit"]{background:var(--accent);color:white;padding:.6rem .9rem;border:none;border-radius:10px;cursor:pointer;font-weight:600}
button[disabled]{opacity:.6;cursor:not-allowed}
.error{color:var(--danger);display:block;height:1rem;font-size:.85rem}
.info.card{padding:1rem}
.foot{text-align:center;font-size:.85rem;margin-top:.5rem}
#notice{margin-top:.5rem}


@media (max-width:520px){
body{padding:1rem}
.brand h1{font-size:1.2rem}
}