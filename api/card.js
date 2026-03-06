import satori from "satori";
import sharp from "sharp";

export default async function handler(req, res) {

  try {

    const { id } = req.query;

    const userId = id || "Unknown";

    const avatar = `https://cdn.discordapp.com/embed/avatars/${Number(userId)%5}.png`;

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            width: "900px",
            height: "300px",
            display: "flex",
            background: "#0f0f0f",
            borderRadius: "30px",
            padding: "40px",
            alignItems: "center",
            color: "white",
            fontFamily: "sans-serif"
          },

          children: [

            {
              type: "img",
              props: {
                src: avatar,
                width: 180,
                height: 180,
                style: {
                  borderRadius: "50%",
                  marginRight: "40px",
                  border: "6px solid #22c55e"
                }
              }
            },

            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexDirection: "column"
                },

                children: [

                  {
                    type: "div",
                    props: {
                      style: {
                        fontSize: 60,
                        fontWeight: "bold"
                      },
                      children: "User Card"
                    }
                  },

                  {
                    type: "div",
                    props: {
                      style: {
                        fontSize: 28,
                        opacity: 0.7
                      },
                      children: `User ID: ${userId}`
                    }
                  }

                ]
              }
            }

          ]
        }
      },
      {
        width: 900,
        height: 300,
        fonts: []
      }
    );

    const png = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.status(200).send(png);

  } catch (err) {

    console.error(err);

    res.status(500).send("Image generation error");

  }

}
