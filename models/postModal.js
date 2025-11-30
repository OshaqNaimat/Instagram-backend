// import mongoose from "mongoose";
// const postSchema = mongoose.Schema(
//   {
//     caption: {
//       type: String,
//       required: false,
//     },
//     filter: {
//       type: Array,
//       required: false,
//       default: "original",
//     },
//     image: {
//       type: Object,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Post = mongoose.model("posts", postSchema);

import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: false,
    },
    filter: {
      type: Array,
      required: false,
      default: "original",
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);
