import { useRouteError} from "react-router-dom";
export default function ErrorPage(){
    console.log(useRouteError());
    return(
        <div id="error-page">
            <h1>404</h1>
            <p>Page Not Found :*(</p>
        </div>
    );
};