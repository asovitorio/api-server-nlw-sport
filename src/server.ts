import express from "express";
import cors from 'cors';
import { prisma } from "./database/prisma/prismaClient";
import { convertHours } from "./utils/convert-hour-interger-to-minutes";
import { convertNumberHour } from "./utils/convert-minutes-interger-to-hour-string";

const app = express();
app.use(express.json());
app.use(cors())

app.get("/games", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            Ad: true,
          },
        },
      },
    });
    return res.status(200).json(games);
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
  }
});

app.get("/ads/:id/discord", async (req, res) => {
  try {
    const id = req.params.id;
    const ad = await prisma.ad.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        // id:true,
        // name:true,
        // week_days:true,
        // use_voice_channel:true,
        discord: true,
        // years_playing:true,
        // hours_start:true,
        // hours_end:true,
      },
    });

    // const ads = {
    //   ...response,
    //   week_days:response?.week_days.split(',')
    // }

    return res.status(200).json(ad);
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
  }
});

app.get("/games/:id/ads", async (req, res) => {
  try {
    const game_id = req.params.id;
    const response = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        week_days: true,
        use_voice_channel: true,
        years_playing: true,
        hours_start: true,
        hours_end: true,
      },
      where: {
        game_id,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    const ads:any = response.map((ad) => {
      return {
        ...ad,
        week_days: ad.week_days.split(","),
        hours_start:convertNumberHour(ad.hours_start),
        hours_end:convertNumberHour(ad.hours_end),
      };
    });
    return res.status(200).json(ads);
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
  }
});

app.post("/games/:id/ads", async (req, res) => {
  try {
   
    const response = await prisma.ad.create({
      data:{
        name:req.body.name,
        discord:req.body.discord,
        week_days:req.body.week_days.join(','),
        years_playing:req.body.years_playing,
        hours_start:convertHours(req.body.hours_start),
        hours_end:convertHours(req.body.hours_end),
        game_id:req.params.id,
        use_voice_channel:req.body.use_voice_channel,

      },
    });
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
  }
});



const port = 3333;
app.listen(port, () => {
  return console.table({ port, msg: "running 👍🚀" });
});
