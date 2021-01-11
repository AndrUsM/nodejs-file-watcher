import indexPage from "./partials/index.js";
import notFound from "./partials/notFound.js";
import publicHandler from "./partials/public.js";

const handler = {};

handler.notFound = notFound;
handler.index = indexPage;
handler.public = publicHandler;

export default handler;