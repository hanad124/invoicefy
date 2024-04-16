import express, { Request, Response } from "express";
import { InvoiceModel, IInvoice } from "../model/invoice.model";
import { ItemModel } from "../model/items.model";
import { ObjectId } from "mongoose";

export const getAllInvoices = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userid } = req.body;

    const invoices = await InvoiceModel.find({
      user: userid,
    });

    const items = await ItemModel.find({
      invoice: { $in: invoices.map((invoice) => invoice._id) },
    }).sort({ createdAt: -1 });

    const invoicesWithItems = invoices.map((invoice) => {
      const invoiceItems = items.filter((item) =>
        item.invoice.equals(invoice._id)
      );

      return {
        ...invoice.toJSON(),
        items: invoiceItems,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Invoices fetched",
      data: invoicesWithItems,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getInvoiceById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { _id, userid } = req.body;

    const invoice = await InvoiceModel.findOne({
      _id: _id,
      user: userid,
    });

    // populate items
    if (invoice) {
      const items = await ItemModel.find({ invoice: invoice._id });

      return res.status(200).json({
        success: true,
        message: "Invoice fetched",
        data: {
          ...invoice.toJSON(),
          items,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const createInvoice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { items, clientName, description, total, user } = req.body;

    const invoice = new InvoiceModel({
      clientName,
      description,
      total,
      user,
    });

    await invoice.save();

    // when saving items, we need to save the item id

    items.forEach(async (item: any) => {
      const newItem = new ItemModel({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        invoice: invoice._id,
      });

      await newItem.save();
    });

    return res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateInvoice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { items, clientName, description, total, userid } = req.body;
    const invoice = await InvoiceModel.findById(req.params.id);

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    invoice.clientName = clientName;
    invoice.description = description;
    invoice.total = total;
    invoice.user = userid;

    await invoice.save();

    const existItems = await ItemModel.find({ invoice: invoice._id });

    // Update existing items and add new items
    for (const item of items) {
      const existItem = existItems.find((i) => i._id.toString() === item._id);

      console.log("item:", item);
      console.log("existItem:", existItem);

      if (existItem) {
        existItem.quantity = item.quantity;
        existItem.price = item.price;
        existItem.total = item.total;

        await existItem.save();
      } else {
        // Create a new item if it doesn't exist
        const newItem = new ItemModel({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          invoice: invoice._id,
        });

        await newItem.save();
      }
    }

    return res.status(201).json({
      success: true,
      message: "Invoice updated",
      data: {
        ...invoice.toJSON(),
        items,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// update status of invoice
export const updateInvoiceStatus = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { status } = req.body;
    console.log(req.body);
    const invoice = await InvoiceModel.findById(req.body._id);

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    invoice.status = status;

    await invoice.save();

    return res.status(201).json({
      success: true,
      message: "Invoice status updated",
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteInvoice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const invoice = await InvoiceModel.findOne({
      _id: req.body._id,
      user: req.body.userid,
    });

    if (invoice) {
      await invoice.deleteOne({ _id: invoice._id });

      await ItemModel.deleteMany({ invoice: invoice._id });

      // revalidate the path

      return res.status(200).json({
        success: true,
        message: "Invoice deleted",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteItem = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const item = await ItemModel.findOne({
      _id: req.body._id,
    });

    if (item) {
      await item.deleteOne({ _id: item._id });

      return res.status(200).json({
        success: true,
        message: "Item deleted",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
