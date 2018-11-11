import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';

export default class Nomes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      nome: "",
      sobrenome: "",
      titulo: "",
      sufixo: "",
      nomePreferido: "Sim",
      usoNome: "Relatório(R)",
      condicional: "Informação não confiável",
      editando: false,
      nomes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNome = this.addNome.bind(this);
    this.updateNome = this.updateNome.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addNome() {

    if(this.state.sobrenome === null || this.state.sobrenome === '') {
      return alert("O campo 'sobrenome' está vazio");
    }

    if(this.state.nomes.length === 9) {
      return alert("Quantidade máxima de nomes excedida");
    }

    let id = new Date().getTime();
    this.state.nomes.push({
      id: id,
      nome: this.state.nome,
      sobrenome: this.state.sobrenome,
      titulo: this.state.titulo,
      sufixo: this.state.sufixo,
      usoNome: this.state.usoNome,
      nomePreferido: this.state.nomePreferido,
      condicional: this.state.condicional
    });
    sessionStorage.setItem("nomes", JSON.stringify(this.state.nomes));
    this.clear();
  }

  deleteNome(id) {
    this.state.nomes.splice(this.state.nomes.findIndex(nome => nome.id === id),1);
    this.setState({ nomes: this.state.nomes });
    sessionStorage.setItem("nomes", JSON.stringify(this.state.nomes));
  }

  clear() {
    this.setState({
      nome: "",
      sobrenome: "",
      sufixo: "",
      titulo: ""
    });
  }

  editNome(nome) {
    this.setState({
      id: nome.id,
      nome: nome.nome,
      sobrenome: nome.sobrenome,
      titulo: nome.titulo,
      sufixo: nome.sufixo,
      nomePreferido: nome.nomePreferido,
      usoNome: nome.usoNome,
      condicional: nome.condicional,
      editando: true
    });
    sessionStorage.setItem("nomes", JSON.stringify(this.state.nomes));
  }

  updateNome() {
    if(this.state.sobrenome === null || this.state.sobrenome === '') {
      return alert("O campo 'sobrenome' está vazio");
    }
    let nomesList = this.state.nomes;
    nomesList[this.state.nomes.findIndex(nome => nome.id === this.state.id)] = {
      id: this.state.id,
      nome: this.state.nome,
      sobrenome: this.state.sobrenome,
      titulo: this.state.titulo,
      sufixo: this.state.sufixo,
      nomePreferido: this.state.nomePreferido,
      usoNome: this.state.usoNome,
      condicional: this.state.condicional
    };

    this.clear();
    this.setState({ nomes: nomesList, editando: false });
    sessionStorage.setItem("nomes", JSON.stringify(this.state.nomes));
  }

  componentDidMount() {
    this.setState({
      nomes: JSON.parse(sessionStorage.getItem("nomes"))
        ? JSON.parse(sessionStorage.getItem("nomes"))
        : []
    });
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Nome
        </Typography>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="nome"
              name="nome"
              label="Nome"
              value={this.state.nome}
              onChange={this.handleChange("nome")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="sobrenome"
              name="sobrenome"
              label="Sobrenome"
              value={this.state.sobrenome}
              onChange={this.handleChange("sobrenome")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
               id="titulo"
              name="titulo"
              label="Título"
              value={this.state.titulo}
              onChange={this.handleChange("titulo")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sufixo"
              name="sufixo"
              label="Sufixo"
              value={this.state.sufixo}
              onChange={this.handleChange("sufixo")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{
                minWidth: "100%"
              }}
            >
              <InputLabel htmlFor="nomePreferido">Nome Preferido</InputLabel>
              <Select
                value={this.state.nomePreferido}
                onChange={this.handleChange("nomePreferido")}
                input={<Input name="nomePreferido" id="nomePreferido" />}
                displayEmpty
              >
                <MenuItem value={"Sim"}>Nome preferido</MenuItem>
                <MenuItem value={"Não"}>Esté não é o nome preferido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{
                minWidth: "100%"
              }}
            >
              <InputLabel htmlFor="usoNome">Uso do Nome</InputLabel>
              <Select
                value={this.state.usoNome}
                input={<Input name="usoNome" id="usoNome" />}
                onChange={this.handleChange("usoNome")}
                displayEmpty
              >
                <MenuItem value={"Relatório(R)"}>Relatório(R)</MenuItem>
                <MenuItem value={"Nome de recém-nascido(N)"}>
                  Nome de recém-nascido(N)
                </MenuItem>
                <MenuItem value={"Nome de recém-nascido(N)"}>
                  Nome profissional ou comercial(C)
                </MenuItem>
                <MenuItem
                  value={"Nome de solteiro, nome de nascimento(Original))"}
                >
                  Nome de solteiro, nome de nascimento(Original)
                </MenuItem>
                <MenuItem value={"Nome registrado (nome legal)"}>
                  Nome registrado (nome legal)
                </MenuItem>
                <MenuItem value={"Outro nome (alias)"}>
                  Outro nome (alias)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{
                minWidth: "100%"
              }}
            >
              <InputLabel htmlFor="condicional">
                Indicador de uso condicional
              </InputLabel>
              <Select
                value={this.state.condicional}
                input={<Input name="condicional" id="condicional" />}
                displayEmpty
                onChange={this.handleChange("condicional")}
              >
                <MenuItem value={"Informação não confiável"}>
                  Informação não confiável
                </MenuItem>
                <MenuItem value={"Nome com erro de digitação"}>
                  Nome com erro de digitação
                </MenuItem>
                <MenuItem value={"Nome para não ser usado"}>
                  Nome para não ser usado
                </MenuItem>
                <MenuItem value={"Vínculo do nome proibido por lei"}>
                  Vínculo do nome proibido por lei
                </MenuItem>
                <MenuItem value={"Requisito de privacidade/segurança especial"}>
                  Requisito de privacidade/segurança especial
                </MenuItem>
                <MenuItem value={"Nome temporário"}>Nome temporário</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} container justify="flex-end">
            {!this.state.editando && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.addNome}
              >
                Adicionar nome
              </Button>
            )}
            {this.state.editando && (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.updateNome}
              >
                Salvar edição
              </Button>
            )}
          </Grid>
        </Grid>

        {this.state.nomes.length > 0 && (
          <Grid>
            <Typography variant="h6" gutterBottom>
              Nomes cadastrados
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Uso do Nome</TableCell>
                  <TableCell>Nome Preferido</TableCell>
                  <TableCell>Indicador de Uso</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.nomes.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.titulo +
                          " " +
                          row.nome +
                          " " +
                          row.sobrenome +
                          " " +
                          row.sufixo}
                      </TableCell>
                      <TableCell>{row.usoNome}</TableCell>
                      <TableCell>{row.nomePreferido}</TableCell>
                      <TableCell>{row.condicional}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="Edit"
                          color="primary"
                          onClick={() => {
                            this.editNome(row);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          color="secondary"
                          onClick={() => {
                            this.deleteNome(row.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}
