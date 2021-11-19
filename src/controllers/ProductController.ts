import { model, PaginateResult, UpdateQuery } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const Product = model('IProduct');

const ProductController = {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1 }: any = req.query;
            const products = await Product.paginate({}, { page, limit: 10 });

            res.json(products);

        } catch (error) {
            res.status(500).json({Error: 'Não foi possível trazer os registros solicitados!'});
            next();
        }
    },

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await Product.findById(req.params.id);

            res.json(product);

        } catch (error) {
            res.status(500).json({Error: 'Não foi possível trazer o registro específico solicitado!'});
            next();
        }
    },

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await Product.create(req.body);

            res.json(product);

        } catch (error) {
            res.status(500).json({Error: 'Não foi possível criar o registro na base de dados!'});
            next();
        }
    },

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

            res.json(product);

        } catch (error) {
            res.status(500).json({Error: 'Não foi possível atualizar o registro na base de dados!'});
            next();
        }
    },

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await Product.findByIdAndRemove(req.params.id);

            res.json({Success: 'Registro deletado com sucesso!'});

        } catch (error) {
            res.status(500).json({Error: 'Não foi possível deletar o registro solicitado!'});
            next();
        }
    }
};

export default ProductController;