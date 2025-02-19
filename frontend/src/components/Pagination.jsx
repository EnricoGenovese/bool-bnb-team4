import { useGlobalContext } from "../contexts/GlobalContext";
import style from "../styles/Pagination.module.css";

export default function Pagination() {
    const { handlePageChange, page, numPages } = useGlobalContext();

    // Funzione per gestire la visualizzazione dei numeri di pagina
    const getPageNumbers = () => {
        let pages = [];

        // Se ci sono più di 3 pagine, si crea una paginazione con i puntini
        if (numPages > 3) {
            if (page <= 2) {
                // Mostra la pagina corrente e le due successive
                pages = [1, 2, 3];
            } else if (page >= numPages - 1) {
                // Mostra la pagina corrente e le due precedenti
                pages.push(numPages - 2, numPages - 1, numPages);
            } else {
                // Mostra la pagina precedente, la corrente, e quella successiva
                pages = [page - 1, page, page + 1];
            }
            // Aggiungi i puntini se necessario

            if (page > 3) {
                pages = [1, "...", ...pages];
            }
            if (page < numPages - 1 && page > 2) {
                pages = [1, "...", page - 1, page, page + 1, "...", numPages]

            }
            else if (page < numPages - 1) {

                pages.push(numPages);
            }
        } else {
            // Se ci sono 3 o meno pagine, mostriamo tutte le pagine
            pages = Array.from({ length: numPages }, (_, i) => i + 1);
        }

        return pages;
    };

    return (
        <nav className="col-12 d-flex justify-content-center">
            <ul className="pagination">



                {/* Pulsante per andare alla pagina precedente */}
                <li className={`page-item ${page <= 1 ? "disabled" : ""} px-5`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </button>
                </li>

                {/* Mostra i numeri di pagina */}
                {getPageNumbers().map((num, index) => (
                    <li
                        className={`page-item ${num === page ? "" : `${style.dark}`} mx-2`}
                        aria-current="page"
                        key={num}
                    >
                        {/* Se è '...', non è cliccabile */}
                        {num === "..." ? (
                            <button className={`page-link ${style.pageBtn}`} disabled>
                                {num}
                            </button>
                        ) : (
                            <button
                                className={`page-link ${num === page ? `${style.active}` : `${style.dark}`} ${style.pageBtn}`}
                                onClick={() => handlePageChange(num)}
                            >
                                {num}
                            </button>
                        )}
                    </li>
                ))}

                {/* Pulsante per andare alla pagina successiva */}
                <li className={`page-item ${page >= numPages ? "disabled" : ""} px-5`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </li>


            </ul>
        </nav>
    );
}
