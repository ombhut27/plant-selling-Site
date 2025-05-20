import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
  try {

    const { name, description, price, category, bestseller, newarrival, hotsales } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url
      })
    )

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      newarrival: newarrival === "true" ? true : false,
      hotsales: hotsales === "true" ? true : false,
      image: imagesUrl,
      date: Date.now()
    }

    console.log(productData);

    const product = new productModel(productData);
    await product.save()

    res.json({ success: true, message: "Product Added" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const listProducts = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const products = await productModel.find({})
      .skip(skip)
      .limit(limit);

    const totalProducts = await productModel.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const DisplayProducts = async (req, res) => {
  try {

    const products = await productModel.find({});
    res.json({ success: true, products })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const removeProduct = async (req, res) => {
  try {

    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const filterProductsByCategoryAndFlags = async (req, res) => {
  try {
    const {
      category,
      hotsales,
      bestseller,
      newarrival,
      minPrice,
      maxPrice,
      page = 1,
      limit = 8,
      sort = "relevant",
    } = req.query;

    const filter = {};


    if (category) {
      filter.category = { $in: category.split(",") };
    }


    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice && maxPrice) {
        filter.price = {
          $elemMatch: {
            $gte: Number(minPrice),
            $lte: Number(maxPrice),
          },
        };
      } else if (minPrice) {
        filter.price = {
          $elemMatch: {
            $gte: Number(minPrice),
          },
        };
      } else if (maxPrice) {
        filter.price = {
          $elemMatch: {
            $lte: Number(maxPrice),
          },
        };
      }
    }

    const orConditions = [];
    if (hotsales === "true") orConditions.push({ hotsales: true });
    if (bestseller === "true") orConditions.push({ bestseller: true });
    if (newarrival === "true") orConditions.push({ newarrival: true });

    let finalQuery = filter;
    if (orConditions.length > 0) {
      finalQuery = { $and: [filter, { $or: orConditions }] };
    }

    let sortOption = {};
    switch (sort) {
      case "name-asc":
        sortOption.name = 1;
        break;
      case "name-desc":
        sortOption.name = -1;
        break;
      case "price-asc":
        sortOption["price.0"] = 1;
        break;
      case "price-desc":
        sortOption["price.0"] = -1;
        break;
      case "relevant":
      default:
        sortOption = {};
        break;
    }

    const skip = (page - 1) * limit;
    const totalProducts = await productModel.countDocuments(finalQuery);
    const products = await productModel
      .find(finalQuery)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    if (products.length === 0) {
      return res.json({
        success: true,
        products: [],
        pagination: {
          currentPage: parseInt(page),
          totalPages: 0,
          totalProducts: 0,
        },
        message: "No matching products found",
      });
    }

    return res.json({
      success: true,
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
      message: "Products retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct, DisplayProducts, filterProductsByCategoryAndFlags }



