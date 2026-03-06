import satori from "satori";
import sharp from "sharp";

export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {

  try {

    const id = req.query.id || "Unknown";

    /*
    Example user data
    Replace with database or API
    */

    const username = "User";
    const tag = "Community Member";

    const avatar = `https://cdn.discordapp.com/embed/avatars/${Number(id)%5}.png`;

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            width: "900px",
            height: "300px",
            display: "flex",
            background: "#0b0b0b",
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
                  border: "6px solid #00ffa6"
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
                      children: username
                    }
                  },

                  {
                    type: "div",
                    props: {
                      style: {
                        fontSize: 28,
                        opacity: 0.7
                      },
                      children: tag
                    }
                  },

                  {
                    type: "div",
                    props: {
                      style: {
                        marginTop: "20px",
                        fontSize: 24,
                        background: "#111",
                        padding: "10px 20px",
                        borderRadius: "20px"
                      },
                      children: `User ID: ${id}`
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
