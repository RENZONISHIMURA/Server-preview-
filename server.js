const express = require("express");
const fs = require("fs");
const path = require("path");
const satori = require("satori");
const sharp = require("sharp");

const app = express();
const PORT = 3000;

/*
Example user database
Replace with real API or database
*/

const users = {
  "1": {
    username: "Sefat",
    tag: "Developer",
    avatar: "https://i.imgur.com/0y0y0y0.png"
  },
  "2": {
    username: "Renzo",
    tag: "Creator",
    avatar: "https://i.imgur.com/0y0y0y0.png"
  }
};

app.get("/", async (req, res) => {

  const id = req.query.id;

  if (!id || !users[id]) {
    return res.status(404).send("User not found");
  }

  const user = users[id];

  const font = fs.readFileSync(
    path.join(__dirname, "font.ttf")
  );

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
          justifyContent: "flex-start",
          color: "white",
          fontFamily: "Inter"
        },

        children: [

          {
            type: "img",
            props: {
              src: user.avatar,
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
                      fontWeight: 700
                    },
                    children: user.username
                  }
                },

                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 32,
                      opacity: 0.7
                    },
                    children: user.tag
                  }
                },

                {
                  type: "div",
                  props: {
                    style: {
                      marginTop: 20,
                      background: "#111",
                      padding: "10px 25px",
                      borderRadius: "20px",
                      fontSize: 24
                    },
                    children: `ID: ${id}`
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
      fonts: [
        {
          name: "Inter",
          data: font,
          weight: 400,
          style: "normal"
        }
      ]
    }
  );

  const png = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  res.set("Content-Type", "image/png");
  res.send(png);
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
