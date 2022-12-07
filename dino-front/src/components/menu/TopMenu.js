import "./TopMenu.css"

export const  TopMenu = () => {

    const items = [
        "Inicio",
        "Categorias",
        "Más vistas",
        "Mis listas",
        "Mis calificaciones",
        "Mi cuenta"
    ]

    return (
        <div className="scrollmenu">
            {items.map((item, idx)=> (
                <a key={idx} href="home">{item}</a>
            ))}
        
        </div>
    )
}