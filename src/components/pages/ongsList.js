import React, { useContext } from "react";
import { useOngs } from "../../context/OngsContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FaHeart } from "react-icons/fa";

const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(Link)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  width: 350px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
`;

const CardImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
`;

const CardTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CardInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => (props.favorited ? '#e91e63' : '#bbb')};
  font-size: 1.5rem;
  transition: color 0.2s;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
`;

const OngsList = () => {
  const { ongs, loading, error } = useOngs();
  const { user } = useContext(AuthContext);
  const [favoriteOngs, setFavoriteOngs] = React.useState([]);

  React.useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setFavoriteOngs(userDoc.data().favoriteOngs || []);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  const handleFavorite = async (ongId) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const isFavorited = favoriteOngs.includes(ongId);
    if (isFavorited) {
      await updateDoc(userRef, { favoriteOngs: arrayRemove(ongId) });
      setFavoriteOngs(favoriteOngs.filter(id => id !== ongId));
    } else {
      await updateDoc(userRef, { favoriteOngs: arrayUnion(ongId) });
      setFavoriteOngs([...favoriteOngs, ongId]);
    }
  };

  console.log("ONGs Data:", ongs); // Log the data to inspect its structure

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar ONGs</div>;

  return (
    <ListContainer>
      <Title>ONGs Cadastradas</Title>
      <Grid>
        {ongs.map((ong) => (
          <div key={ong.id} style={{position:'relative'}}>
            <FavoriteButton
              favorited={favoriteOngs.includes(ong.id) ? 'true' : undefined}
              onClick={e => {
                e.preventDefault();
                handleFavorite(ong.id);
              }}
              title={favoriteOngs.includes(ong.id) ? 'Desfavoritar' : 'Favoritar'}
            >
              <FaHeart />
            </FavoriteButton>
            <Card to={`/ong-details/${ong.id}`}>
              <CardImage src={ong.imagemUrl} alt={ong.nome} />
              <CardContent>
                <CardTitle>{ong?.nome}</CardTitle>
                <CardDescription>{ong?.endereco.cidade} - {ong?.endereco.estado}</CardDescription>
                <CardInfo>
                  <InfoItem />
                </CardInfo>
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>
    </ListContainer>
  );
};

export default OngsList;
