import colors from "colors";
export default function logger(req, res, next) {
  const methodColors = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  };

  const color = methodColors[req.method] || white;

  console.log(
    `Request received for ${req.method} from ${req.protocol}://${req.get(
      "host"
    )}${req.originalUrl} at: ${new Date()}`[color]
  );
  next();
}
