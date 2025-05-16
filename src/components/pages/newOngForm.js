import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #FF6B6B;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #FF6B6B;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const uploadImageWithUniqueName = async (file, folder, uniqueName) => {
  if (!file) throw new Error("Nenhum arquivo foi fornecido.");
  const storageRef = ref(storage, `${folder}/${uniqueName}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

const NewOngForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    email: "",
    telefone: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    imagemUrl: "",
    categoria: "",
    pixKey: "",
    ativo: true,
    verificada: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        endereco: { ...formData.endereco, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const ongsCollection = collection(db, "ongs");
      const newOngRef = doc(ongsCollection);
      let imageUrl = "";
      if (imageFile) {
        const uniqueName = `${newOngRef.id}_${imageFile.name.replace(
          /\s+/g,
          "_"
        )}`;
        // Corrige: cria novo File para garantir nome correto
        const fileToUpload = new File(
          [await imageFile.arrayBuffer()],
          uniqueName,
          { type: imageFile.type }
        );
        imageUrl = await uploadImageWithUniqueName(fileToUpload, "ongs", uniqueName);
      }
      await setDoc(newOngRef, { ...formData, imagemUrl: imageUrl });
      setSuccess(true);
      setFormData({
        nome: "",
        descricao: "",
        email: "",
        telefone: "",
        endereco: {
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
          estado: "",
        },
        imagemUrl: "",
        categoria: "",
        pixKey: "",
        ativo: true,
        verificada: false,
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setError("Não foi possível adicionar a ONG. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Adicionar Nova ONG</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Nome</Label>
        <Input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <Label>Descrição</Label>
        <TextArea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          rows="4"
          required
        />

        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Label>Telefone</Label>
        <Input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
        />

        <Label>Categoria</Label>
        <Input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />

        <Label>Endereço</Label>
        <Input
          type="text"
          name="endereco.rua"
          placeholder="Rua"
          value={formData.endereco.rua}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="endereco.numero"
          placeholder="Número"
          value={formData.endereco.numero}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="endereco.bairro"
          placeholder="Bairro"
          value={formData.endereco.bairro}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="endereco.cidade"
          placeholder="Cidade"
          value={formData.endereco.cidade}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="endereco.estado"
          placeholder="Estado"
          value={formData.endereco.estado}
          onChange={handleChange}
          required
        />

        <Label>Chave PIX</Label>
        <Input
          type="text"
          name="pixKey"
          value={formData.pixKey}
          onChange={handleChange}
          required
        />

        <Label>Imagem</Label>

        {loading ? (
          <Button disabled>Adicionando...</Button>
        ) : (
          <Button type="submit">Adicionar ONG</Button>
        )}

        {success && <p style={{ color: "green" }}>ONG adicionada com sucesso!</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Form>
    </Container>
  );
};

export default NewOngForm;