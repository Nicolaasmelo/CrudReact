import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [cars, setCars] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const [carSelected, setCarSelected] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, name: data.name }),
    };
    fetch("http://localhost:5164/api/Car", requestOptions).then(() => {
      alert("Carro adicionado com sucesso!");
      setisLoading(true);
      reset();
    });
  };

  const onSubmitEdit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: carSelected.email,
        name: carSelected.name,
      }),
    };
    fetch(
      `http://localhost:5164/api/Car/${carSelected.id}`,
      requestOptions
    ).then(() => {
      alert("Carro Editado com sucesso!");
      setisLoading(true);
      reset();
    });
  };

  const onSubmitDelete = () => {
    const confirmation = confirm("Deseja mesmo excluir Esse registro?");

    if (confirmation) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        `http://localhost:5164/api/Car/${carSelected.id}`,
        requestOptions
      ).then(() => {
        alert("Carro Deletado com sucesso!");
        setisLoading(true);
        reset();
      });
    }
  };

  useEffect(() => {
    if (isloading) {
      fetch("http://localhost:5164/api/Car")
        .then((res) => res.json())
        .then((cars) => setCars(cars));
      setisLoading(false);
    }
  }, [isloading]);

  return (
    <>
      {cars.map((car) => (
        <div
          onClick={() => setCarSelected(car)}
          style={{ display: "flex", gap: 20 }}
          key={car.id}
        >
          <p>Nome: {car.name}</p>
          <p>E-mail: {car.email}</p>
        </div>
      ))}

      <div>Adicionar Usuario</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Nome" {...register("name")} />
        </div>
        <input placeholder="E-mail" {...register("email")} />

        <input type="submit" value="Criar" />
      </form>
      <br />
      <br />
      <div>Editar Usuario</div>

      <form onSubmit={handleSubmit(onSubmitEdit)}>
        <div>
          <input defaultValue={carSelected.id} placeholder="id do Usuario" />
        </div>
        <div>
          <input
            onChange={(ev) =>
              setCarSelected({ ...carSelected, name: ev.target.value })
            }
            defaultValue={carSelected.name}
            placeholder="Nome"
          />
        </div>
        <input
          defaultValue={carSelected.email}
          onChange={(ev) =>
            setCarSelected({ ...carSelected, email: ev.target.value })
          }
          placeholder="E-mail"
        />
        <input type="submit" value="Editar" />
      </form>

      <br />
      <br />
      <div>Deletar Usuario</div>
      <form onSubmit={handleSubmit(onSubmitDelete)}>
        <div>
          <input defaultValue={carSelected.id} placeholder="id do Usuario" />
        </div>

        <input type="submit" value="Deletar" />
      </form>
    </>
  );
}

export default App;
