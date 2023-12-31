import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { consultaEditarPedido, consultaPedido} from "../../helpers/queries";
import Swal from "sweetalert2";


const EditarPedido = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const {id} = useParams();
  const navegacion = useNavigate()

  useEffect(()=>{
    consultaPedido(id).then((respuesta)=>{
      if(respuesta){
        setValue('nombreProducto', respuesta.nombreProducto);
        setValue('precio', respuesta.precio);
        setValue('imagen', respuesta.imagen);
        setValue('categoria', respuesta.categoria);
        setValue('descripcion', respuesta.descripcion);
        setValue('estado', respuesta.estado);
        setValue('nombreUsuario', respuesta.nombreUsuario);
        setValue('cantidad', respuesta.cantidad);
        setValue('precioTotal', respuesta.precioTotal);
        setValue('fechaActual', respuesta.fechaActual);
        
      }else{
        Swal.fire('Ocurrio un error', `No se puede editar el pedido, intentelo mas tarde`, 'error');
      }
    })
  }, [])

  const onSubmit = (pedidoEditado) => {
    console.log(pedidoEditado);
   consultaEditarPedido(pedidoEditado,id).then((respuesta)=>{
    if(respuesta && respuesta.status === 200){
      Swal.fire('Producto editado', `El producto ${pedidoEditado.nombreProducto} fue editado correctamente`, 'success');
      navegacion('/administrador');
    }else{
      Swal.fire('Ocurrio un error', `El producto ${pedidoEditado.nombreProducto} no fue editado, intentelo mas tarde`, 'error');
    }
   })
  };

  return (
    <section className="container mainSection bg-white rounded-2">
      <h1 className="display-4 mt-5">Editar pedido</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formNombreProducto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 100,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio del producto es obligatorio",
              min: {
                value: 1,
                message: "El precio minimo es de $1",
              },
              max: {
                value: 10000,
                message: "El precio maximo es de $10000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescripcion">
          <Form.Label>Descripcion*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: café torrado"
            {...register("descripcion", {
              required: "la descripcion del producto es obligatoria",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 300,
                message: "La cantidad maxima de caracteres es de 2 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required: "La imagen es obligatoria",
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "La imagen es obligatoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="con carne">con carne</option>
            <option value="vegetariano">vegetariano</option>
            <option value="sin tacc">sin tacc</option>
            <option value="vegano">vegano</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
            
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formestado">
          <Form.Label>Disponibilidad*</Form.Label>
          <Form.Select
            {...register("estado", {
              required: "La disponibilidad es obligatoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="pendiente">pendiente</option>
            <option value="realizado">realizado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.estado?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUsuario">
          <Form.Label>usuario*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: usuario"
            {...register("nombreUsuario", {
              required: "el nombre de usuario es obligatorio",
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formcantidad">
          <Form.Label>cantidad*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 100"
            {...register("cantidad", {
              required: "ingrese una cantidad de productos, es obligatoria",
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formprecioTotal">
          <Form.Label>precio total*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 5000"
            {...register("precioTotal", {
              required: "ingrese el precio total de la compra, es obligatorio",
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formfechaActual">
          <Form.Label>fecha de compra*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 00/00/0000"
            {...register("fechaActual", {
              required: "ingrese la fecha de compra, es obligatoria",
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mb-2">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default EditarPedido;