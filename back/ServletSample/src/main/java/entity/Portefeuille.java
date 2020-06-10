package entity;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Currency;
import java.util.Set;

@Entity
@Table(name="portefeuille")
public class Portefeuille {
    @Expose
    @Id
    @GeneratedValue
    Long portefeuilleId;

    @OneToMany(cascade = CascadeType.MERGE,fetch = FetchType.EAGER,mappedBy="portefeuille")
    private Set<Monnaie> currencies;

    @OneToOne(fetch = FetchType.LAZY)
    User owner;

    public Set<Monnaie> getCurrencies() {
        return currencies;
    }
    public void setCurrencies(Set<Monnaie> currencies) {
        this.currencies = currencies;
    }
    public Portefeuille() {
    }

    public Long getId() {
        return portefeuilleId;
    }

    public void setId(Long id) {
        this.portefeuilleId = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
