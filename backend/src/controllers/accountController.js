const mongoose = require("mongoose");
const Account = require("../models/account.model");

const getBalance = async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
};

const transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient Balance.",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.json({
      message: "Transaction Successful.",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: "Error processing transaction.",
    });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getBalance,
  transfer,
};
