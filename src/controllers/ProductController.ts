import { model, PaginateResult, UpdateQuery } from 'mongoose';

const Product = model('IProduct');

const ProductController = {
    async index(req: { query: { page?: 1 } }, res: { json: (arg0: PaginateResult<any>) => any; }) {
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, { page, limit: 10 });

        return res.json(products);
    },

    async show(req: { params: { id: string } }, res: { json: (arg0: any) => any; }): Promise<void> {
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },

    async store(req: { body: string }, res: { json: (arg0: any) => any; }): Promise<void> {
        const product = await Product.create(req.body);

        return res.json(product);
    },

    async update(req: { params: { id: string }; body: UpdateQuery<any> }, res: { json: (arg0: any) => any; }): Promise<void> {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(product);
    },

    async destroy(req: { params: { id: string } }, res: { send: () => any; }): Promise<void> {
        await Product.findByIdAndRemove(req.params.id);

        return res.send();
    }
};

export default ProductController;