const express = require('express');
const router = express.Router();
const {
    findAll,
    findAllByUncompleted,
    createNewQueue,
    updateOrderedAt,
    updatePaymentedAt,
    updateServicedAt,
    updateHandedAt,
    getQueues,
} = require('../controllers/QueueController');


// 未完了のQueueを取得
router.get('/', async (req, res) => {
    const option = req.query.option;
    const result = option === 'uncompleted' ? await findAllByUncompleted() : await findAll();
    res.json(result);
});

// 新規Queueを作成(行列参加時)
router.post('/new', async (req, res) => {
    const isMan = req.body.isMan;
    const queue = await createNewQueue(isMan);
    res.json({
        queue
    });
});

// QueueにOrderedAtを登録(行列で自分の番が来た時)
router.post('/order', async (req, res) => {
    const queueId = req.body.id;
    const queue = await updateOrderedAt(queueId);
    res.json({ queue });
});

// QueueにPaymentedAtを登録(注文が終わり決済が始まった時
router.post('/payment', async (req, res) => {
    const queueId = req.body.id;
    const orderId = queueId;
    console.log(req.body);
    console.log(orderId);
    const queue = await updatePaymentedAt(queueId, orderId);
    res.json({ queue });
});

// QueueにServicedAtを登録(注文決済が終わった時)
router.post('/service', async (req, res) => {
    const queueId = req.body.id;
    const isCacheLess = req.body.isCacheLess;
    console.log(isCacheLess);
    const queue = await updateServicedAt(queueId, isCacheLess);
    res.json({ queue });
});

router.post('/hand', async (req, res) => {
    console.log(req.body);
    const orderId = req.body.order_id;
    if (!orderId) {
        return res.status(500).json({});
    }
    const queue = await updateHandedAt(orderId);
    res.json({queue});
});

router.get('/pure', async (req, res) => {
    const date = req.query.date;
    const queues = await getQueues({date});
    res.json(queues);
});

router.get('/json', async (req, res) => {
    const date = req.query.date;
    const queues = await getQueues({date});
    res.setHeader('Content-disposition', `attachment; filename=${date}-queue.json`);
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.send(queues);
});

module.exports = router;
