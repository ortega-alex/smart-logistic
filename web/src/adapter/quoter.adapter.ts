export const QuoterAdapter = (item: any) => ({
    ...item,
    id_cliente: item.cliente?.id_cliente,
    id_vendedor: item.vendedor?.id_usuario,
    id_tipo_vehiculo: item.tipo_veniculo?.id_tipo_vehiculo,
    id_puerto: item.puerto?.id_puerto,
    id_subasta: item.subasta?.id_subasta,
    id_grua_usd: item.grua_usd?.id_grua,
    id_grua_gt: item.grua_gt?.id_g
});
