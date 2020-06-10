package dao;

import entity.Portefeuille;
import entity.Portefeuille;
import org.hibernate.Session;
import org.hibernate.Transaction;
import util.HibernateUtil;

import java.util.ArrayList;
import java.util.List;

public class PortefeuilleDao {
    /**
     * Save Portefeuille
     * @param Portefeuille
     */
    public void savePortefeuille(Portefeuille Portefeuille) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(Portefeuille);
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
     * Update Portefeuille
     * @param Portefeuille
     */
    public void updatePortefeuille(Portefeuille Portefeuille) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.update(Portefeuille);
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
     * Delete Portefeuille
     * @param id
     */
    public void deletePortefeuille(int id) {

        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();

            // Delete a Portefeuille object
            Portefeuille Portefeuille = session.get(Portefeuille.class, id);
            if (Portefeuille != null) {
                session.delete(Portefeuille);
                System.out.println("Portefeuille is deleted");
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
     * Get Portefeuille By ID
     * @param id
     * @return
     */
    public Portefeuille getPortefeuille(int id) {

        Transaction transaction = null;
        Portefeuille Portefeuille = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an Portefeuille object
            Portefeuille = (entity.Portefeuille) session.createQuery("from Portefeuille where owner_id='"+id+"'").getResultList().get(0);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return Portefeuille;
    }

    /**
     * Get all Portefeuilles
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<Portefeuille> getAllPortefeuille(String id ) {

        Transaction transaction = null;
        List<Portefeuille> listOfPortefeuille = new ArrayList<>();
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an Portefeuille object

            listOfPortefeuille.addAll(session.createQuery("from Portefeuille where forum_message_id='"+id+"'").getResultList());

            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return listOfPortefeuille;
    }
}
