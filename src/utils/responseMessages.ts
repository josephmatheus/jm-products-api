export const responseMessages = (
  route: string,
  method: string,
  statusCode: number,
  data?: any
) => {
  const routeMessages: any = {
    "/": {
      GET: {
        200: {
          api: "JM-PRODUCTS-API",
          message: "Bem-vindo à JM-PRODUCTS-API.",
          version: "1.0.0",
          timestamp: new Date().toLocaleString(),
        },
      },
    },
    "/products": {
      GET: {
        200: {
          success: true,
          message: "Produtos obtidos com sucesso.",
          total: data?.length || 0,
          products: data || [],
        },
        500: {
          error: "INTERNAL_SERVER_ERROR",
          message: "Não foi possivel obter os produtos.",
          timestamp: new Date().toLocaleString(),
        },
      },
      POST: {
        201: {
          success: true,
          message: "Produto criado com sucesso.",
          product: data || {},
        },
        409: {
          error: "CONFLICT",
          message: "Ja existe um produto com o código informado.",
          timestamp: new Date().toLocaleString(),
        },
        500: {
          error: "INTERNAL_SERVER_ERROR",
          message: "Não foi possivel criar o produto.",
          timestamp: new Date().toLocaleString(),
        },
      },
    },
    "/products/:id": {
      GET: {
        200: {
          success: true,
          message: "Produto obtido com sucesso.",
          product: data || {},
        },
        404: {
          error: "NOT_FOUND",
          message: "Não foi encontrado produto com o ID informado.",
          timestamp: new Date().toLocaleString(),
        },
        500: {
          error: "INTERNAL_SERVER_ERROR",
          message: " Não foi possivel obter o produto.",
          timestamp: new Date().toLocaleString(),
        },
      },
      PUT: {
        200: {
          success: true,
          message: "Produto atualizado com sucesso.",
          product: data || {},
        },
        404: {
          error: "NOT_FOUND",
          message: "Não foi encontrado produto com o ID informado.",
          timestamp: new Date().toLocaleString(),
        },
        500: {
          error: "INTERNAL_SERVER_ERROR",
          message: "Não foi possivel atualizar o produto.",
          timestamp: new Date().toLocaleString(),
        },
      },
      DELETE: {
        200: {
          success: true,
          message: "Produto deletado com sucesso.",
          product: data || {},
        },
        404: {
          error: "NOT_FOUND",
          message: "Não foi encontrado produto com o ID informado.",
          timestamp: new Date().toLocaleString(),
        },
        500: {
          error: "INTERNAL_SERVER_ERROR",
          message: "Não foi possivel deletar o produto.",
          timestamp: new Date().toLocaleString(),
        },
      },
    },
    "/category/:name": {
      GET: {
        200: {
          success: true,
          message: "Produtos obtidos com sucesso.",
          product: data || {},
        },
        404: {
          error: "NOT_FOUND",
          message: "Não foram encontrados produtos com a categoria informada.",
          timestamp: new Date().toLocaleString(),
        },
        500: {
          error: "INTERNAL_SERVER_ERROR",
          message: " Não foi possivel obter os produtos.",
          timestamp: new Date().toLocaleString(),
        },
      }
    },
  };

  const routeResponse = routeMessages[route]?.[method]?.[statusCode] || {
    success: false,
    message: "Erro desconhecido.",
    statusCode,
  };

  return {
    ...routeResponse,
    ...(statusCode === 500 && {
      timestamp: new Date().toLocaleString(),
    }),
  };
};
