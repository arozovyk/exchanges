package dao;

import entity.Monnaie;
import org.hibernate.Session;
import org.hibernate.Transaction;
import util.HibernateUtil;

import java.util.ArrayList;
import java.util.List;

public class MonnaieDao {
    /**
     * Save Monnaie
     * @param Monnaie
     */
    public void saveMonnaie(Monnaie Monnaie) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(Monnaie);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Update Monnaie
     * @param Monnaie
     */
    public void updateMonnaie(Monnaie Monnaie) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.update(Monnaie);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Delete Monnaie
     * @param id
     */
    public void deleteMonnaie(int id) {

        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();

            // Delete a Monnaie object
            Monnaie Monnaie = session.get(Monnaie.class, id);
            if (Monnaie != null) {
                session.delete(Monnaie);
                System.out.println("Monnaie is deleted");
            }

            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Get Monnaie By ID
     * @param id
     * @return
     */
    public Monnaie getMonnaie(int id) {

        Transaction transaction = null;
        Monnaie Monnaie = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an Monnaie object
            Monnaie = session.get(Monnaie.class, id);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return Monnaie;
    }

    /**
     * Get all Monnaies
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<Monnaie> getAllMonnaie(String id ) {

        Transaction transaction = null;
        List<Monnaie> listOfMonnaie = new ArrayList<>();
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an Monnaie object

            listOfMonnaie.addAll(session.createQuery("from Monnaie where forum_message_id='"+id+"'").getResultList());

            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return listOfMonnaie;
    }
    
}
