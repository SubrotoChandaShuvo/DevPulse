import express, { type Application, type Request, type Response } from 'express'
import { authRoute } from './modules/auth/auth.route';
import { issueRoute } from './modules/issue/issue.route';
import cors from "cors";
import globalErrorHandler from './middleware/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
}));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'DevPlus Server',
    author: "Subroto Chanda Shuvo",
    email: "subroto.mu.cse@gmail.com"
  })
})

app.use("/api/auth", authRoute)
app.use("/api/issues", issueRoute)


app.use(globalErrorHandler);

export default app;