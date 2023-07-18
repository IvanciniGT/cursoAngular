export class Usuario {
    id!: number;
    // El dato no es obligatorio... final
    // Ya lo pondrán
    nombre!: string;
    apellidos!: string;
    edad!: number;
    email!: string;
}


/**
 public class Usuario {
    private int id;
    private String nombre;
    private String apellidos;
    private int edad;
    private String email;

    public int getId(){
        return this.id;
    }
    public int getEdad(){
        return this.edad;
    }
    // resto de getter
    public void setId(int id){
        this.id = id;
    }
    // Resto de setter
    public int getEdad(){
        return this.edad;
    }
    public void setEdad(int edad){
        if(edad < 0) throw new RuntimeException("Vaya mierdad de edad !!!!");
        this.edad = edad;
    }
}

*/