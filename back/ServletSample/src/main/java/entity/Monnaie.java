package entity;

import com.google.gson.annotations.Expose;

import javax.persistence.*;

@Entity
@Table(name="monnaie")
public class Monnaie {
    public Long getId() {
        return useless;
    }

    public void setId(Long id) {
        this.useless = id;
    }
    @Id
    @GeneratedValue
    private Long useless;

    @Expose
    @Column(name="currency")
    String currency;
    @Expose
    @Column(name="montant")
    double montant;

    public Monnaie(String currency, double montant) {
        this.currency = currency;
        this.montant = montant;
    }

    public Portefeuille getPortefeuille() {
        return portefeuille;
    }

    public void setPortefeuille(Portefeuille portefeuille) {
        this.portefeuille = portefeuille;
    }

    @ManyToOne(cascade = CascadeType.MERGE,fetch = FetchType.EAGER)
    @JoinColumn(name="portefeuilleId", nullable=false)
    Portefeuille portefeuille;



    public Monnaie() {
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }
}
